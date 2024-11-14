import { Router } from "express";
import { addTaskHandler, updateTaskHandler } from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.post("/", addTaskHandler);
taskRoutes.put("/:taskId", updateTaskHandler);

export default taskRoutes;