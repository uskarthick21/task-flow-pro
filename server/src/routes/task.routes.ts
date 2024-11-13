import { Router } from "express";
import { addTaskHandler } from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.post("/", addTaskHandler);

export default taskRoutes;