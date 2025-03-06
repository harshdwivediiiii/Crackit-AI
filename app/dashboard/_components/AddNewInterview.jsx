"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const { user } = useUser()

    const form = useForm({
        defaultValues: {
            jobPosition: "",
            jobDesc: "",
            jobExperience: "",
        }
    })

    const onSubmit = async (data) => {
        setLoading(true)

        const { jobPosition, jobDesc, jobExperience } = data

        const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Based on these, provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with answers in JSON format. Structure should be: { question, answer }`

        const result = await chatSession.sendMessage(InputPrompt)
        const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')

        try {
            const parsedResponse = JSON.parse(MockJsonResp)

            const resp = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp: MockJsonResp,
                    jobPosition,
                    jobDesc,
                    jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-yyyy')
                }).returning({ mockId: MockInterview.mockId })

            if (resp) {
                setOpenDialog(false)
                router.push(`/dashboard/interview/${resp[0]?.mockId}`)
            }
        } catch (error) {
            console.error("Failed to parse AI response", error)
        }

        setLoading(false)
    }

    return (
        <div>
            <div
                className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all border-dashed"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="text-lg text-center">+ Add New</h2>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your job interview</DialogTitle>
                        <DialogDescription>
                            Fill out the form below to generate a mock interview tailored to your role.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <h3 className="text-lg font-bold">Job Details</h3>

                            <FormField
                                control={form.control}
                                name="jobPosition"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Role/Job Position</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex. Full Stack Developer" required {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="jobDesc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Description/Tech Stack</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Ex. React, Angular, NodeJs, MySql etc" required {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="jobExperience"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Years of Experience</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex. 5" type="number" max="100" required {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-4">
                                <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <LoaderCircle className="animate-spin mr-2" />
                                            Generating from AI...
                                        </>
                                    ) : (
                                        'Start Interview'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview
