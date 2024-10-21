import { RequestHandler } from "express";
import { UNAUTHORIZED } from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";
import appAssert from "../utils/appAssert";
import { verifyToken } from "../utils/jwt";
import mongoose from "mongoose";

declare global {
    namespace Express {
      interface Request {
        userId: mongoose.Types.ObjectId;
        sessionId: mongoose.Types.ObjectId;
      }
    }
  }
  
const authenticate:RequestHandler = (req, res, next) => {

    const accessToken = req.cookies.accessToken as string | undefined;
    appAssert(accessToken, UNAUTHORIZED, "Not Authorized", AppErrorCode.InvalidAccessToken);

    const {error, payload} = verifyToken(accessToken);
    appAssert(payload, UNAUTHORIZED, error === "jwt expired" ? "Token expired" : "Invalid token", AppErrorCode.InvalidAccessToken);

    req.userId = payload.userId as mongoose.Types.ObjectId;
    req.sessionId = payload.sessionId as mongoose.Types.ObjectId;

    next();
}
export default authenticate;