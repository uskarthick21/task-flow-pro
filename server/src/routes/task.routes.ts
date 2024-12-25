import { Router } from "express";
import { addTaskHandler, updateTaskHandler, getTasksByUserHandler, deleteTaskHandler, getTaskByIdHandler, getTasksBySearchHandler } from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.get("/", getTasksByUserHandler);
taskRoutes.post("/", addTaskHandler);
taskRoutes.get("/search", getTasksBySearchHandler)
taskRoutes.put("/:taskId", updateTaskHandler);
taskRoutes.delete("/:taskId", deleteTaskHandler);
taskRoutes.get("/:taskId", getTaskByIdHandler);


export default taskRoutes;