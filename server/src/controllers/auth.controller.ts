import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import { createAccount } from "../services/auth.service";
import { CREATED } from "../constants/http";

const registerSchema = z.object({
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

export const registerHandler = catchErrors(async(req, res) => {
    // Validate request
        // To validate the request, we use ZOD for schema validation.
        const request = registerSchema.parse({
            ...req.body,
        });
    // call service
    const { user } = await createAccount(request);
    // return response
   
    return res.status(CREATED).json(user);
})