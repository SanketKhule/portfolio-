
"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
 
export function TypewriterEffectDemo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message: feedback,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatusMessage(data.message ?? "Failed to send feedback.");
        return;
      }

      setStatusMessage("Feedback sent successfully.");
      setName("");
      setEmail("");
      setFeedback("");
    } catch {
      setStatusMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const words = [
    {
      text: "Tell",
    },
    {
      text: "us",
    },
    {
      text: "What",
    },
    {
      text: "you",
    },
    {
      text: "like",
    },
    {
      text: "&",
    },
    {
      text: "what",
    },
    {
      text: "we",
    },
    {
      text: "should",
    },
    {
      text: "change!",
      className: "text-blue-500 dark:text-blue-500",
    },
   
  ];
  return (
    <div className="mb-10 flex h-40 flex-col items-center justify-center">
      <p className="text-neutral-600 dark:text-neutral-200 text-base  mb-10">
        “We’re always improving 🚀
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10 max-w-full ">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" variant="default">Send Feedback</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share Your Feedback</DialogTitle>
              <DialogDescription>
                Help us improve by sharing your thoughts and suggestions.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FieldGroup>
                <Field>
                  <Label htmlFor="name-1">Name</Label>
                  <Input
                    id="name-1"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </Field>
                <Field>
                  <Label htmlFor="email-1">Email</Label>
                  <Input
                    id="email-1"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </Field>
                <Field>
                  <Label htmlFor="desc-1">Your Feedback</Label>
                  <Textarea
                    id="desc-1"
                    name="desc"
                    value={feedback}
                    onChange={(event) => setFeedback(event.target.value)}
                    placeholder="Write your feedback"
                    required
                    rows={4}
                  />
                </Field>
              </FieldGroup>
              {statusMessage ? (
                <p className={`text-sm font-medium ${
                  statusMessage.includes("success") || statusMessage.includes("successfully")
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}>
                  {statusMessage}
                </p>
              ) : null}
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Feedback"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Button asChild size="lg" variant="outline">
          <Link href="/feedbachtemp">View Feedback</Link>
        </Button>
      </div>
    </div>
  );
}

export default TypewriterEffectDemo;
