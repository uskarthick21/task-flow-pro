import { CookieOptions, Response } from "express";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";
import { setAuthCookiesParams } from "./dataTypes";

export const REFRESH_PATH = "/auth/refresh";
const secure = process.env.NODE_ENV !== "development";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure,
};

export const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: fifteenMinutesFromNow(),
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
  // path is used here is, only send the refresh token cookie only when path is "REFRESH_PATH". Not send for other path. it safe and security.
  path: REFRESH_PATH,
});

// type Params = {
//   res: Response;
//   accessToken: string;
//   refreshToken: string;
// };
export const setAuthCookies = ({ res, accessToken, refreshToken }: setAuthCookiesParams) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

    export const clearAuthCookies = (res: Response) =>
      res
        .clearCookie("accessToken")
        .clearCookie("refreshToken", { path: REFRESH_PATH });