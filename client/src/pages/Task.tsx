import React from 'react'
import { LuPlus } from 'react-icons/lu'
import TaskStatusList from '../components/TaskStatusList'
import { Link } from 'react-router-dom'


const Task = () => {
  return (
    <>
        <div className="flex justify-between">
            <h1 className="text-3xl text-black font-confort font-medium flex items-center justify-center">Task</h1>
            <Link to="/task/add" title="Add New" className="bg-sky-blue flex items-center justify-center rounded text-white text-md px-4 py-2 gap-2"><LuPlus className="text-white text-md" /> 
                Add New
            </Link>
        </div>
        <div className="pt-6">
            <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4">
                <TaskStatusList />
            </div>
        </div>
    </>
  )
}

export default Task
