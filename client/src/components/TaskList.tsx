import React from 'react'
import { LuCalendarClock, LuFileEdit, LuTrash2 } from 'react-icons/lu'

const TaskList = () => {
  return (
    <div className="border border-white-smoke p-4 rounded-md flex flex-col justify-start">
      <div className="flex items-center justify-between pb-4">
        <button className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded-md">Critical</button>
        <div className="flex gap-2">
            <button title="Edit" ><LuFileEdit className="text-md" /></button>
            <button title="Delete" ><LuTrash2 className="text-md" /></button>
        </div>
      </div>
      <h6 className="text-lg font-bold">This is Task Title</h6>
      <p className="text-xs py-4">Lorem ipsum Lorem ipsum </p>
      <div className="flex flex-row lg:flex-col xl:flex-row justify-between gap-2">
        <div className="flex  gap-2">
          <button className="bg-green-700 text-white px-2 py-1 text-xs rounded-lg">Low</button>
          <button className="bg-green-700 text-white px-2 py-1 text-xs rounded-lg">Low</button>
        </div>
          <button title="Date" className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-md gap-2 flex items-center justify-center"><LuCalendarClock /> Nov 20</button>
      </div>
    </div>
  )
}

export default TaskList
