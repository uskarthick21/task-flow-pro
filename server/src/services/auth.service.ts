import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import appAssert from "../utils/appAssert";
import { CONFLICT,  UNAUTHORIZED } from "../constants/http";
import { CreateAccountParams, loginParams } from "../utils/dataTypes";

export const createAccount = async(data: CreateAccountParams) => {

    // verify existing user if doesn't exist
    const existingUser = await UserModel.exists({
        email: data.email,
    });

    appAssert(!existingUser, CONFLICT, "Email already in use");

    // create user
    const user = await UserModel.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
    })

    // create session
    const session = await SessionModel.create({
        userId: user._id
    })

    // sign access token & refresh token
    const refreshToken = jwt.sign(
        {sessionId: session._id},
        JWT_REFRESH_SECRET,
        {
            audience: ["user"],
            expiresIn: "30d"
        }
    );

    const accessToken = jwt.sign(
        {
            userId: user._id,
            sessionId: session._id
        },
        JWT_SECRET,
        {
            audience: ["user"],
            expiresIn: "15m"
        }
    )

    // return user & tokens
    return {
        user: user.omitPassword(),
        accessToken,
        refreshToken
    }
}

export const loginAccount = async({email, password}: loginParams) => {

    // Verify the Existing user if exist or not
    const user = await UserModel.findOne({ email })

    // if user not in database then throw an error
    appAssert(user, UNAUTHORIZED, "user not found. Please register" );

    // validate password from the request
    const isValidPassword = await user.comparePassword(password);
    appAssert(isValidPassword, UNAUTHORIZED, "Invalid Email or Password");

    // create a session
    const session = await SessionModel.create({
        userId: user._id
    })

    // sign access token & refresh token
    const refreshToken = jwt.sign(
        {sessionId: session._id},
        JWT_REFRESH_SECRET,
        {
            audience: ["user"],
            expiresIn: "30d"
        }
    );

    const accessToken = jwt.sign(
        {
            userId: user._id,
            sessionId: session._id
        },
        JWT_SECRET,
        {
            audience: ["user"],
            expiresIn: "15m"
        }
    )

    // return user & tokens
    return {
        user: user.omitPassword(),
        accessToken,
        refreshToken
    }

}