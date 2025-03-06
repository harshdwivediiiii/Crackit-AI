"use client";

import React, { useState } from "react";
import { Mic, Send, ChevronRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function QuestionPage() {
    const [answer, setAnswer] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    const question = {
        id: 1,
        text: "What is Crackit AI, and how does it help candidates prepare for interviews?"
    };

    const sampleAnswer = `
Crackit AI is an AI-powered mock interview platform designed to help job seekers practice and improve their interview skills. 
It tailors questions based on the candidate’s field and job role, simulates real interview conditions, and provides instant feedback on their responses. 
With Crackit AI, candidates can practice multiple rounds, track their performance, and gain confidence before facing actual interviews.
`;

    const handleStartRecording = () => {
        setIsRecording(true);
        // Placeholder for recording logic if needed later
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        // Placeholder for processing recorded answer
    };

    const handleSubmitAnswer = () => {
        setShowFeedback(true);  // Show feedback after submitting answer
        console.log("User Answer Submitted:", answer);
        setAnswer("");
    };

    return (
        <div className="p-6 md:p-10 space-y-6">
            <h1 className="text-3xl font-bold text-primary">Crackit AI - Sample Interview Question</h1>

            <Card className="border border-primary/30 shadow-md">
                <CardHeader className="text-xl font-semibold text-primary">
                    {question.text}
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        className="min-h-[120px] border border-gray-300"
                    />
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            onClick={isRecording ? handleStopRecording : handleStartRecording}
                            className={`flex items-center gap-2 ${isRecording ? "text-red-500" : "text-primary"}`}
                        >
                            <Mic size={18} />
                            {isRecording ? "Recording..." : "Record Answer"}
                        </Button>

                        <Button onClick={handleSubmitAnswer} className="flex items-center gap-2">
                            <Send size={18} />
                            Submit Answer
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {showFeedback && (
                <Alert className="mt-4 border-primary/50">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <AlertTitle>Suggested Answer</AlertTitle>
                    <AlertDescription className="text-gray-700 whitespace-pre-wrap">
                        {sampleAnswer}
                    </AlertDescription>
                </Alert>
            )}

            <div className="flex justify-end">
                <Button variant="default" className="flex items-center gap-2">
                    Next Question
                    <ChevronRight size={18} />
                </Button>
            </div>
        </div>
    );
}

export default QuestionPage;
