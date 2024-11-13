import mongoose from "mongoose";
import { z } from "zod";

/* Register Schema */

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

/* Login Schema */

export const loginSchema = z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(6).max(255),
})

/* Task Schema */

const TaskStatus = z.enum(["Pending", "In Progress", "Completed", "On Hold"]);
const TaskPriority = z.enum(["Low", "Medium", "High", "Critical"]);

export const taskSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    status: TaskStatus,
    priority: TaskPriority,
    createdDate: z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date()),
    createdBy: z.string().min(1).max(255),
    tags: z.array(z.string()),
});