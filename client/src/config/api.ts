import { LoginFormData } from "../pages/Login";
import { RegisterFormData } from "../pages/Register";
import API from "./apiClient";
import {UserType} from "../../../server/src/shared/types"


export const registerForm = async (data: RegisterFormData) => API.post("/auth/register", data);
export const loginForm = async (data: LoginFormData) => API.post("/auth/login", data);
export const getUser = async (): Promise<UserType> => API.get("/user");
// export const cookieCheck = async() => API.get("/auth/cookieCheck");