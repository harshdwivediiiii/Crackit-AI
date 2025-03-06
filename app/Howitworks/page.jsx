"use client";

import React from 'react';
import { Lightbulb, CheckCircle, MessageSquare, User, Bot, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Image from 'next/image';

// Step Data
const steps = [
    {
        title: "Step 1: Create Your Profile",
        description: "Set up your profile by adding your field of interest, job role, and experience level. This helps Crackit AI customize your interview process.",
        icon: <User size={32} className="text-primary" />
    },
    {
        title: "Step 2: Select Your Domain & Job Role",
        description: "Pick the domain you are preparing for — Software Engineering, Marketing, Data Science, or others — and choose the specific job role.",
        icon: <Lightbulb size={32} className="text-primary" />
    },
    {
        title: "Step 3: Start Mock Interview",
        description: "Crackit AI generates real-time, role-specific interview questions based on your profile, simulating a real interview environment.",
        icon: <MessageSquare size={32} className="text-primary" />
    },
    {
        title: "Step 4: Answer & Get Instant Feedback",
        description: "Respond to the questions by typing or speaking. Crackit AI evaluates your answers and provides immediate feedback to help you improve.",
        icon: <Bot size={32} className="text-primary" />
    },
    {
        title: "Step 5: Track Your Progress",
        description: "Your performance and feedback are saved, allowing you to monitor your growth across multiple sessions and identify areas to focus on.",
        icon: <CheckCircle size={32} className="text-primary" />
    }
];

function HowItWorksPage() {
    return (
        <div className="p-6 md:p-10 space-y-8">
            {/* Animated GIF */}
            <div className="w-full flex justify-center">
                <Image
                    src="/interview.gif" 
                    alt="Interview Process Animation"
                    width={500} 
                    height={300}
                    className="rounded-lg shadow-lg"
                    unoptimized
                />
            </div>

            {/* Title & Intro */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">How Crackit AI Works</h1>
                <p className="text-gray-600">
                    Crackit AI is your personal AI interview coach, designed to help you practice and crack your dream job interviews.
                    Follow these simple steps to make the most out of Crackit AI.
                </p>
            </div>
            {/* Steps Section */}
            <div className="space-y-6">
                {steps.map((step, index) => (
                    <DropdownMenu key={index}>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-4 cursor-pointer border p-4 rounded-lg hover:bg-gray-100 transition">
                                <div className="flex-shrink-0">
                                    {step.icon}
                                </div>
                                <h2 className="text-lg font-semibold text-primary">{step.title}</h2>
                                <ChevronDown className="ml-auto text-gray-500" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-72">
                            <DropdownMenuItem className="whitespace-normal text-gray-700">
                                {step.description}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ))}
            </div>

            {/* CTA Section */}
            <div className="mt-10 text-center">
                <h2 className="text-2xl font-bold text-primary">Ready to Ace Your Interview?</h2>
                <p className="text-gray-600 mt-2">Start your personalized mock interview now and boost your confidence.</p>
                <a
                    href="/dashboard"
                    className="inline-block mt-4 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
                >
                    Start Interview
                </a>
            </div>
        </div>
    );
}

export default HowItWorksPage;
