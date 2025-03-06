"use client";

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import QuestionsSection from './start/_components/QuestionsSection';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation'; // ✅ Import useParams

// Lazy load (fixes `window is not defined`)
const RecordAnswerSection = dynamic(() => import('./start/_components/RecordAnswerSection'), { ssr: false });

function StartInterview() {
    const { interviewId } = useParams(); // ✅ Get params properly

    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        if (interviewId) {
            GetInterviewDetails(interviewId);
        }
    }, [interviewId]);

    const GetInterviewDetails = async (id) => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, id)); // ✅ Use interviewId from params

        const jsonMockResp = JSON.parse(result[0]?.jsonMockResp || '[]');
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
    };

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <QuestionsSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                />
                <RecordAnswerSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData}
                />
            </div>
            <div className='flex justify-end gap-6'>
                {activeQuestionIndex > 0 &&
                    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>}
                {activeQuestionIndex !== mockInterviewQuestion?.length - 1 &&
                    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}
                {activeQuestionIndex === mockInterviewQuestion?.length - 1 &&
                    <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                        <Button>End Interview</Button>
                    </Link>}
            </div>
        </div>
    );
}

export default StartInterview;
