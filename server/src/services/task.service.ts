import { CONFLICT } from "../constants/http";
import TaskModel, { TaskDocument } from "../models/task.model";
import appAssert from "../utils/appAssert";
import { CreateTaskParams } from "../utils/dataTypes";


export const createTask = async (data: CreateTaskParams): Promise<TaskDocument> => {
    // Check if task already exists
    const existingTask = await TaskModel.findOne({
        title: data.title
    })
    appAssert(!existingTask, CONFLICT, "Task with same title already exists.");

    // Proceed to create a task if it doesn't exist
    const newTask = new TaskModel(data);
    await newTask.save();
    return newTask;
}