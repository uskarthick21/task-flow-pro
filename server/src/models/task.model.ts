import mongoose from "mongoose";

enum TaskStatus {
    Todo = "Todo",
    InProgress = "In Progress",
    Completed = "Completed",
    OnHold = "On Hold"
}

enum TaskPriority {
    Low = "Low",
    Medium = "Medium",
    High = "High",
    Critical = "Critical"
}

export interface TaskDocument extends mongoose.Document {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdDate: Date;
    userId: mongoose.Types.ObjectId;
    tags: string[];
}

const taskSchema = new mongoose.Schema<TaskDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: Object.values(TaskStatus), required: true },
    priority: { type: String, enum: Object.values(TaskPriority), required: true },
    createdDate: { type: Date, default: Date.now, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    tags: [{ type: String, required: true }]
});

const TaskModel = mongoose.model<TaskDocument>("Task", taskSchema);

export default TaskModel;