import { RegisterFormData } from "../pages/Register";
import API from "./apiClient";


export const registerForm = async (data: RegisterFormData) => API.post("/auth/register", data);