import jwt, { JwtPayload, VerifyOptions } from "jsonwebtoken";
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

export const verifyToken = <TPayload extends object = AccessTokenPayload> (
    token: string, 
    options?: VerifyOptions & {
    secret?: string;
}) => {

    const {secret = JWT_SECRET, ...verifyOpts} = options || {}

    try {
        const payload = jwt.verify(token, secret, {
            ...verifyOpts
        }) as TPayload;
        return {payload}
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}