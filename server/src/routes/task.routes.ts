import { Router } from "express";
import { addTaskHandler, updateTaskHandler, getTasksByUserHandler, deleteTaskHandler } from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.post("/", addTaskHandler);
taskRoutes.put("/:taskId", updateTaskHandler);
taskRoutes.get("/:userId", getTasksByUserHandler);
taskRoutes.delete("/:taskId", deleteTaskHandler);

export default taskRoutes;