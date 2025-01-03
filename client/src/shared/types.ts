import { TagsEnum, TaskPriorityEnum, TaskStatusEnum } from "../utils/enums";

export type UserType = {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
}

export type TaskType = {
    _id: string;
    title: string;
    description: string;
    status: TaskStatusEnum;
    priority: TaskPriorityEnum;
    createdDate: Date | string; // Allow both Date and string types
    userId: string; // assuming this is a string representation of ObjectId
    tags: TagsEnum[];
}

export type AddTaskType = Omit<TaskType, "_id">;