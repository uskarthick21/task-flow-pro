import React from 'react'
import { LuPlus } from 'react-icons/lu'

const Task = () => {
  return (
    <>
        <div className="flex justify-between">
            <h1 className="text-3xl text-black font-confort font-medium flex items-center justify-center">Task</h1>
            <button className="bg-sky-blue flex items-center justify-center rounded text-white text-md px-4 py-2 gap-2"><LuPlus className="text-white text-md" /> 
                Add New
            </button>
        </div>
        {/* <div className="pt-6">
            <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4">
              
                <div className="bg-blue-200 flex-1 p-4 text-center">
                    Div 1
                </div>
          
                <div className="bg-red-200 flex-1 p-4 text-center">
                    Div 2
                </div>

                <div className="bg-green-200 flex-1 p-4 text-center">
                    Div 3
                </div>
            </div>
        </div> */}
    </>

  )
}

export default Task
