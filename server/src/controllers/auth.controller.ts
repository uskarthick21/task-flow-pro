import catchErrors from "../utils/catchErrors";
import { createAccount, loginAccount } from "../services/auth.service";
import { CREATED, OK } from "../constants/http";
import { setAuthCookies } from "../utils/cookies";
import { loginSchema, registerSchema } from "../utils/zodSchemas";


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