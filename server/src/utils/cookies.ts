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
  path: "/", // Explicitly set path for accessToken
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: REFRESH_PATH, // Set path to limit exposure to the refresh endpoint
});

// Function to set both access and refresh token cookies
export const setAuthCookies = ({ res, accessToken, refreshToken }: setAuthCookiesParams) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

// Function to clear both cookies with matching options
export const clearAuthCookies = (res: Response) =>
  res
    .clearCookie("accessToken", { path: "/", maxAge: 0 }) // Ensure path matches the one used to set
    .clearCookie("refreshToken", { path: REFRESH_PATH }); // Use sam