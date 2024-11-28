import { LoginFormData } from "../pages/Login";
import { RegisterFormData } from "../pages/Register";
import API from "./apiClient";
import {AddTask, TaskType, UserType} from "../shared/types"


export const registerForm = async (data: RegisterFormData) => API.post("/auth/register", data);
export const loginForm = async (data: LoginFormData) => API.post("/auth/login", data);
export const logOut = async () => API.get("/auth/logout");
export const getUser = async (): Promise<UserType> => API.get("/user");

export const tasks = async (): Promise<TaskType[]> => API.get("/task");
export const addTask = async (data: AddTask) => API.post("/task", data);