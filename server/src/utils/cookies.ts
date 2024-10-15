import { CookieOptions, Response } from "express";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

export const REFRESH_PATH = "/auth/refresh";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  // When the secure option is set to true, the cookie will only be sent over HTTPS connections. This means the cookie cannot be transmitted over unencrypted HTTP, which helps protect the cookie from being intercepted by attackers during transmission.
  secure: true,
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

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};
export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

    export const clearAuthCookies = (res: Response) =>
      res
        .clearCookie("accessToken")
        .clearCookie("refreshToken", { path: REFRESH_PATH });