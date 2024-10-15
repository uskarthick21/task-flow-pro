import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../constants/env";
import {UserDocument} from "../models/user.model"
import { SessionDocument } from "../models/session.model";

export type AccessTokenPayload = {
    userId: UserDocument["_id"],
    sessionId: SessionDocument["_id"]
}

export type RefreshTokenPayload = {
    sessionId: SessionDocument["_id"]
}

export const verifyToken = <TPayload extends object = AccessTokenPayload> (token: string) => {
    try {
        const payload = jwt.verify(token, JWT_SECRET) as TPayload;
        return {payload}
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}