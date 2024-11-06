import { Response } from "express";

export type CreateAccountParams = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type loginParams = {
    email: string;
    password: string;
}

export type setAuthCookiesParams = {
    res: Response;
    accessToken: string;
    refreshToken: string;
  };