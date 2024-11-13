import { createTask } from "../services/task.service";
import catchErrors from "../utils/catchErrors";
import { taskSchema } from "../utils/zodSchemas";


export const addTaskHandler = catchErrors(async(req, res) => {

    // Validate request
    const request = taskSchema.parse({...req.body});
    
    // Call a service
    const task = await createTask(request);

    // Respond with the created task
    res.status(201).json({
        message: "Task created successfully",
        task,
    });

});