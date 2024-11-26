import React from 'react'
import { TaskStatusEnum } from '../utils/enums'
import TaskList from './TaskList';

const TaskStatusList = () => {

    
    
    const taskStatus = Object.values(TaskStatusEnum);
    return (
    <>
        {taskStatus.map((status) => {
            return (
                <div key={status} className="bg-white w-full lg:flex-1 p-4">
                    <h3 className="border-b border-white-smoke pb-4 mb-4 text-center font-bold text-lg">{status}</h3>
                    <TaskList />
                </div>
            )
        })}
    </>
    )
}

export default TaskStatusList
