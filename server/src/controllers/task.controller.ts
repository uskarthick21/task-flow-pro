import TaskModel from "../models/task.model";
import { createTask, updateTask, getTasksByUser, deleteTasks, getTaskById } from "../services/task.service";
import catchErrors from "../utils/catchErrors";
import { taskSchema } from "../utils/zodSchemas";


export const addTaskHandler = catchErrors(async (req, res) => {
    // Validate request
    const taskAddReq = taskSchema.parse({ ...req.body });

    console.log("REQUEST:", taskAddReq)

    // Call a service
    const task = await createTask(req.userId, taskAddReq);

    // Respones with the created task
    res.status(201).json({
        message: "Task created successfully",
        task,
    });

});

export const updateTaskHandler = catchErrors(async (req, res) => {
    // Validate request
    const taskUpdateReq = taskSchema.parse({ ...req.body });

    // Call a service:
    const task = await updateTask(req.params.taskId, req.userId, taskUpdateReq);

    // Response with the updated task
    res.status(201).json({
        message: "Task updated successfully",
        task
    })
})

export const getTasksByUserHandler = catchErrors(async (req, res) => {
    // Call a service:
    const tasks = await getTasksByUser(req.userId);

    // Response for User tasks
    res.status(201).json(
        tasks
    )
})

export const deleteTaskHandler = catchErrors(async (req, res) => {
    // Call a service
    const tasks = await deleteTasks(req.params.taskId);

    // Response
    res.status(201).json({
        message: "Task deleted successfully"
    })
})

export const getTaskByIdHandler = catchErrors(async (req, res) => {
    // call a service
    const task = await getTaskById(req.params.taskId);

    //Response 
    res.status(201).json(task)
})

