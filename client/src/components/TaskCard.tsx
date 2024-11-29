import { LuCalendarClock, LuFileEdit, LuTrash2 } from "react-icons/lu";
import { TaskType } from "../shared/types";
import { TaskPriorityEnum } from "../utils/enums";

type task = {
  task: TaskType;
};

const TaskCard = ({ task }: task) => {
  let priorityColor;
  switch (task.priority) {
    case TaskPriorityEnum.Low:
      priorityColor = "bg-green-100 text-green-700";
      break;
    case TaskPriorityEnum.Medium:
      priorityColor = "bg-yellow-100 text-yellow-700";
      break;
    case TaskPriorityEnum.High:
      priorityColor = "bg-orange-100 text-orange-700";
      break;
    case TaskPriorityEnum.Critical:
      priorityColor = "bg-red-100 text-red-700";
      break;
    default:
      priorityColor = "bg-green-100 text-green-700";
      break;
  }

  return (
    <>
      <div className="border border-white-smoke p-4 rounded-md flex flex-col mt-4 justify-start">
        <div className="flex items-center justify-between pb-4">
          <button className={`${priorityColor} px-2 py-1 text-xs rounded-md`}>
            {task.priority}
          </button>
          <div className="flex gap-2">
            <button title="Edit">
              <LuFileEdit className="text-md" />
            </button>
            <button title="Delete">
              <LuTrash2 className="text-md" />
            </button>
          </div>
        </div>
        <h6 className="text-lg font-bold">{task.title}</h6>
        <p className="text-xs py-4 break-words">
          {task.description.substring(0, 40)}
        </p>
        <div className="flex flex-row lg:flex-col xl:flex-row justify-between gap-2 items-start">
          <div className="flex gap-2 flex-wrap items-center flex-1">
            {task.tags
              .map((tag) => {
                return (
                  <span key={tag}>
                    <button className="bg-green-700 text-white px-2 py-1 text-xs rounded-lg">
                      {tag}
                    </button>
                  </span>
                );
              })
              .slice(0, 2)}{" "}
            {/* {task.tags.length > 2 ? <LuMoreHorizontal /> : ""} */}
          </div>
          <button
            title="Date"
            className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-md gap-2 flex items-center"
          >
            <LuCalendarClock /> Nov 20
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
