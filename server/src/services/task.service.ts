import mongoose, { Types } from "mongoose";
import { CONFLICT, NOT_FOUND } from "../constants/http";
import TaskModel, { TaskDocument } from "../models/task.model";
import appAssert from "../utils/appAssert";
import { CreateTaskParams } from "../utils/dataTypes";
import UserModel from "../models/user.model";


export const createTask = async (userId: Types.ObjectId, data: CreateTaskParams): Promise<TaskDocument> => {
    // Check if task already exists
    const existingTask = await TaskModel.findOne({
        title: data.title,
        userId
    })
    appAssert(!existingTask, CONFLICT, "Task with same title already exists.");

    const taskData = {
        ...data,
        userId
    }

    // Proceed to create a task if it doesn't exist
    const newTask = new TaskModel(taskData);
    await newTask.save();
    return newTask;
}

export const updateTask = async (taskId: string, userId: Types.ObjectId, data: CreateTaskParams): Promise<TaskDocument> => {
    // Validate that taskId is a valid ObjectId
    appAssert(mongoose.isValidObjectId(taskId), NOT_FOUND, "Invalid task ID format");

    // Check if the task exists and is owned by the user
    const task = await TaskModel.findOne({ _id: taskId, userId: userId });
    appAssert(task, NOT_FOUND, "Task not found or user does not have permission to update this task");

    // Check if any other task already has the same title
    if (data.title) {
        const duplicateTask = await TaskModel.findOne({ title: data.title, _id: { $ne: taskId } });
        appAssert(!duplicateTask, CONFLICT, "A task with the same title already exists.");
    }

    // Update the task and return the updated document
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, data, { new: true });
    appAssert(updatedTask, NOT_FOUND, "Task not found after update");

    return updatedTask;
};

export const getTasksByUser = async (userId: Types.ObjectId): Promise<TaskDocument[]> => {

    // Check if the user exists
    const userExists = await UserModel.exists({ _id: userId });
    appAssert(userExists, NOT_FOUND, "User not found");

    // Fetch tasks for the user
    const tasks = await TaskModel.find({ userId: userId });
    return tasks
}

export const deleteTasks = async (taskId: string) => {
    // Check if the task exists
    const existingTask = await TaskModel.findOne({ _id: taskId });

    // If the task does not exist, throw a NOT_FOUND error
    appAssert(existingTask, NOT_FOUND, "Task not found.");

    // If the task exists, delete it
    await TaskModel.deleteOne({ _id: taskId });
}

