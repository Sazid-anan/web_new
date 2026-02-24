import { z } from "zod";

// Email validation schema with regex
export const emailSchema = z
  .string({ required_error: "Email is required" })
  .email("Invalid email address")
  .toLowerCase();

// Password validation with strength requirements
export const passwordSchema = z
  .string({ required_error: "Password is required" })
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[!@#$%^&*]/, "Password must contain at least one special character");

// Generic text validation
export const textSchema = (minLength = 1, maxLength = 255) =>
  z
    .string({ required_error: "Text is required" })
    .min(minLength, `Must be at least ${minLength} characters`)
    .max(maxLength, `Must be no more than ${maxLength} characters`)
    .trim();

// URL validation
export const urlSchema = z
  .string({ required_error: "URL is required" })
  .url("Invalid URL format")
  .or(z.literal(""));

// Phone number validation (international format)
export const phoneSchema = z
  .string({ required_error: "Phone is required" })
  .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
  .or(z.literal(""));

// Contact form validation schema
export const contactFormSchema = z.object({
  name: textSchema(2, 100),
  email: emailSchema,
  subject: textSchema(3, 200),
  message: textSchema(10, 5000),
  phone: phoneSchema.optional(),
  agreeToTerms: z.boolean().default(false),
});

// News subscription schema
export const subscriptionFormSchema = z.object({
  email: emailSchema,
  firstName: textSchema(1, 50).optional(),
  lastName: textSchema(1, 50).optional(),
  interests: z.array(z.string()).min(1, "Select at least one interest").default([]),
});

// Authentication schema
export const authSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// User profile update schema
export const profileUpdateSchema = z.object({
  name: textSchema(2, 100),
  email: emailSchema,
  phone: phoneSchema.optional(),
  bio: textSchema(0, 500).optional(),
  website: urlSchema.optional(),
});

// Comment/feedback schema
export const feedbackSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5, "Rating must be between 1 and 5"),
  title: textSchema(3, 200),
  comment: textSchema(10, 1000),
  email: emailSchema.optional(),
  displayName: textSchema(2, 50).optional(),
});

// Bulk email validation
export const bulkEmailSchema = z.object({
  emails: z
    .string()
    .transform((str) =>
      str
        .split(/[\n,;]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
    )
    .pipe(z.array(emailSchema))
    .refine((emails) => emails.length > 0, "At least one email is required"),
});

// File upload validation
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "File must be less than 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "application/pdf"].includes(file.type),
      "Only JPG, PNG, and PDF files are allowed",
    ),
  description: textSchema(0, 500).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type SubscriptionFormData = z.infer<typeof subscriptionFormSchema>;
export type AuthFormData = z.infer<typeof authSchema>;
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;
export type FeedbackData = z.infer<typeof feedbackSchema>;
export type BulkEmailData = z.infer<typeof bulkEmailSchema>;
export type FileUploadData = z.infer<typeof fileUploadSchema>;
