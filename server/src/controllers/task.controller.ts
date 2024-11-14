import { createTask, updateTask } from "../services/task.service";
import catchErrors from "../utils/catchErrors";
import { taskSchema } from "../utils/zodSchemas";


export const addTaskHandler = catchErrors(async(req, res) => {

    // Validate request
    const request = taskSchema.parse({...req.body});
    
    // Call a service
    const task = await createTask(request);

    // Respones with the created task
    res.status(201).json({
        message: "Task created successfully",
        task,
    });

});

export const updateTaskHandler = catchErrors(async(req, res) => {

    // Validate request
    const request = taskSchema.parse({...req.body});

    // Call a service:
    const task = await updateTask(req.params.taskId, request);

    // Response with the updated task
    res.status(201).json({
        message: "Task updated successfully",
        task
    })
})