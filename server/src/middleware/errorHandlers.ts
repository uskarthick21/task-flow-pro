import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";
import AppError from "../utils/AppError";
import { clearAuthCookies, REFRESH_PATH } from "../utils/cookies";

const handleZodError = (res: Response, error: z.ZodError) => {
    const errors = error.issues.map((err) => ({
        path: err.path.join("."),
        message: err.message
    }))

    res.status(BAD_REQUEST).json({
        message: error.message,
        errors
    })
}

const handleAppError = (res: Response, error: AppError) => {
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
    })
}
 
 const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    // JSON.stringify(error, null, 4)
    console.log(`PATH: ${req.path}`, JSON.stringify(error, null, 4));

    if(req.path === REFRESH_PATH){
        clearAuthCookies(res)
    }

    if(error instanceof z.ZodError) {
        return handleZodError(res, error);
    }

    if (error instanceof AppError) {
        return handleAppError(res, error);
    }

     res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error")
 }

 export default errorHandler;