"use client"

import { FormEvent, useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const initialFormState = {
  email: "",
  number: "",
  companyName: "",
  description: "",
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = useState(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState<{
    type: "idle" | "success" | "error"
    message: string
  }>({
    type: "idle",
    message: "",
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitState({ type: "idle", message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = (await response.json()) as { message?: string }

      if (!response.ok) {
        throw new Error(data.message ?? "Failed to send message.")
      }

      setFormData(initialFormState)
      setSubmitState({
        type: "success",
        message: data.message ?? "Message sent successfully.",
      })
    } catch (error) {
      setSubmitState({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to send message.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-xl font-bold">Welcome to Portfolio.</h1>
            <p className="text-sm text-red-600 dark:text-red-400">
              Please fill out the form below to get in touch with me. I look forward to hearing from you!
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="sanketkhule@gmail.com"
              value={formData.email}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              required
            />
            <FieldLabel htmlFor="number">Number</FieldLabel>
            <Input
              id="number"
              name="number"
              type="tel"
              placeholder="+91 7887636352"
              value={formData.number}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  number: event.target.value,
                }))
              }
              required
            />
            <FieldLabel htmlFor="companyName">Company Name</FieldLabel>
            <Input
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Your Company Name"
              value={formData.companyName}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  companyName: event.target.value,
                }))
              }
              required
            />
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              name="description"
              placeholder=" Description"
              value={formData.description}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              required
            />
          </Field>
          <Field>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            {submitState.message ? (
              <p
                className={cn(
                  "mt-3 text-sm",
                  submitState.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                )}
              >
                {submitState.message}
              </p>
            ) : null}
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
