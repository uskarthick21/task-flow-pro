import UserModel from "../models/user.model";

export type CreateAccountParams = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const createAccount = async(data: CreateAccountParams) => {

    // verify existing user if doesn't exist
    const existingUser = await UserModel.exists({
        email: data.email,
    });

    if(existingUser) {
        throw new Error("User already exists");
    }

    // create user
    const user = await UserModel.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
    })

    // create session
    // sign access token & refresh token
    // return user & tokens
    return {
        user
    }
}