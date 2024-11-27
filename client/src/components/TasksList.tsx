
import { TaskStatusEnum } from '../utils/enums';
import {TaskType} from "../shared/types"
import TaskCard from './TaskCard';

type TaskStatusCardProps = {
  status: TaskStatusEnum;
  tasks: TaskType[] | undefined;
}

const TasksList = ({status, tasks=[]}: TaskStatusCardProps) => {

  const taskByStatus = tasks?.filter((task) =>
    {
      return task.status === status
    })

  return (
    <div key={status} className="bg-white w-full lg:flex-1 p-4">
      <h3 className="border-b border-white-smoke pb-4 text-center font-bold text-lg">{status}</h3>
      {
        taskByStatus?.map((task) => {
          return (
            <TaskCard key={task._id} task={task} />
          )
        })
      }
    </div>
  )
}

export default TasksList
