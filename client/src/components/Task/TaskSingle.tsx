import React from "react";
import { TaskPriorityEnum } from "../../utils/enums";
import { LuCalendarClock } from "react-icons/lu";
import { TaskType } from "../../shared/types";

type taskParams = {
  task: TaskType | undefined;
  navigate: (url: string) => void;
};

const TaskSingle = ({ task, navigate }: taskParams) => {
  const { title, description, priority, status, tags, createdDate } =
    task || {};

  let priorityColor;
  switch (priority) {
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

  const formattedDate = createdDate
    ? new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(createdDate))
    : "Invalid Date";

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/task");
  };

  return (
    <div className="flex flex-col gap-y-6 bg-white p-6">
      <div>
        <h1 className="text-3xl">{title}</h1>
      </div>
      <div className="flex gap-2 flex-wrap">
        <button
          title="Date"
          className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-md "
        >
          <span className="gap-2 flex items-center">
            <LuCalendarClock /> {formattedDate}
          </span>
        </button>
        <button
          title="Priority"
          className={`${priorityColor} px-2 py-1 text-xs rounded-md`}
        >
          {priority}
        </button>
        <button
          title="Status"
          className="bg-blue-700 text-white px-2 py-1 text-xs rounded-lg"
        >
          {status}
        </button>
        {tags?.map((tag) => {
          return (
            <button
              title={tag}
              key={tag}
              className="bg-green-700 text-white px-2 py-1 text-xs rounded-lg"
            >
              {tag}
            </button>
          );
        })}
      </div>
      <div className="text-sm py-2 break-words">{description}</div>
      <div className="flex justify-end mt-4 gap-2">
        <span>
          <button
            title={"Back to Task"}
            onClick={handleCancel}
            type="button"
            className="bg-sky-blue text-white p-2 font-bold text-md rounded-md"
          >
            Back to Task
          </button>
        </span>
      </div>
    </div>
  );
};

export default TaskSingle;
