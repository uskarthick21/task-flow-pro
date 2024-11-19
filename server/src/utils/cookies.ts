import { CookieOptions, Response } from "express";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";
import { setAuthCookiesParams } from "./dataTypes";

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
  path: "/", // Explicitly set path for accessToken
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: REFRESH_PATH, // Set path to limit exposure to the refresh endpoint
});

export const setAuthCookies = ({ res, accessToken, refreshToken }: setAuthCookiesParams) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

    export const clearAuthCookies = (res: Response) =>
      res
        .clearCookie("accessToken")
        .clearCookie("refreshToken", { path: REFRESH_PATH });