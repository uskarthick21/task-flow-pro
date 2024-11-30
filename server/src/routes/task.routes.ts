import { Router } from "express";
import { addTaskHandler, updateTaskHandler, getTasksByUserHandler, deleteTaskHandler, getTaskByIdHandler } from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.get("/", getTasksByUserHandler);
taskRoutes.post("/", addTaskHandler);
taskRoutes.put("/:taskId", updateTaskHandler);
taskRoutes.delete("/:taskId", deleteTaskHandler);
taskRoutes.get("/:taskId", getTaskByIdHandler);

export default taskRoutes;