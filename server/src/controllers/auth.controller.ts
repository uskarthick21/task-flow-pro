import catchErrors from "../utils/catchErrors";
import { createAccount, loginAccount } from "../services/auth.service";
import { CREATED, OK } from "../constants/http";
import { clearAuthCookies, setAuthCookies } from "../utils/cookies";
import { loginSchema, registerSchema } from "../utils/zodSchemas";
import { verifyToken } from "../utils/jwt";
import SessionModel from "../models/session.model";


export const registerHandler = catchErrors(async(req, res) => {
    // Validate request
        // To validate the request, we use ZOD for schema validation.
        const request = registerSchema.parse({
            ...req.body,
        });

    // call service
    const { user, accessToken, refreshToken } = await createAccount(request);

    // return response
   
        // setAuthCookies is untiltiy function to set accessToken and refreshToken in response object with the required proerties that we define and return the response.
        return setAuthCookies({res, accessToken, refreshToken}).status(CREATED).json(user);
})

export const loginHandler = catchErrors(async(req, res) => {

    // Validate request
    const request = loginSchema.parse(req.body);

    // call service
    const {accessToken, refreshToken} = await loginAccount(request);

    // return response:
    return setAuthCookies({res, accessToken, refreshToken}).status(OK).json({
        message: "Login successful"
    });
})

export const logoutHandler = catchErrors(async (req, res) => {
    const accessToken = req.cookies.accessToken;
    
    const {payload, error} = verifyToken(accessToken || '')
    if(payload) {
        // Below line throw an error like - Property 'sessionId' does not exist on type 'string | JwtPayload'
        // So we have let them that payload coming out is actually our accessTokenPayload. So we are going to define types in verifyToken function.

        // await SessionModel.findByIdAndDelete(payload.sessionId)
        await SessionModel.findByIdAndDelete(payload.sessionId)
    }

    return clearAuthCookies(res).status(OK).json({
        message: "Logout successful"
    })
})