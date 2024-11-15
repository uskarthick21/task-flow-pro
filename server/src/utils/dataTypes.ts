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

  export interface CreateTaskParams {
    title: string;
    description: string;
    status: "Pending" | "In Progress" | "Completed" | "On Hold";
    priority: "Low" | "Medium" | "High" | "Critical";
    createdDate: Date;
    userId: string; // assuming this is a string representation of ObjectId
    tags: string[];
}