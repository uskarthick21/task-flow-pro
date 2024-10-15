import { z } from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(1).max(255),
    lastName: z.string().min(1).max(255),
    email: z.string().email().min(1).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords to not match",
    path: ["confirmPassword"],
})

export const loginSchema = z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(6).max(255),
})