import { LoginFormData } from "../pages/Login";
import { RegisterFormData } from "../pages/Register";
import API from "./apiClient";


export const registerForm = async (data: RegisterFormData) => API.post("/auth/register", data);
export const loginForm = async (data: LoginFormData) => API.post("/auth/login", data);