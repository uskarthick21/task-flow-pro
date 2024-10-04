import { NextFunction, Request, Response } from "express";

type AsyncController = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>

const catchErrors = (errorController: AsyncController): AsyncController => 
    async (req,res, next) => {
        try {
            await errorController(req, res, next)
        } catch (error) {
            next(error)
        }
    }


export default catchErrors;