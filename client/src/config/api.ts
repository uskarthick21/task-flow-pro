import { LoginFormData } from "../pages/Login";
import { RegisterFormData } from "../pages/Register";
import API from "./apiClient";
import { AddTaskType, TaskType, UserType } from "../shared/types"


export const registerForm = async (data: RegisterFormData) => API.post("/auth/register", data);
export const loginForm = async (data: LoginFormData) => API.post("/auth/login", data);
export const logOut = async () => API.get("/auth/logout");
export const getUser = async (): Promise<UserType> => API.get("/user");

export const alltasks = async (): Promise<TaskType[]> => API.get("/task");
export const addTask = async (data: AddTaskType) => API.post("/task", data);
export const updateTask = async (data: TaskType, taskId: string) => API.put(`/task/${taskId}`, data);
export const deleteTask = async (taskId: string) => API.delete(`/task/${taskId}`);
export const getTaskById = async (taskId: string): Promise<TaskType> => API.get(`/task/${taskId}`);