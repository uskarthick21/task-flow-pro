import React, { useEffect } from "react";
import { TagsEnum, TaskPriorityEnum, TaskStatusEnum } from "../../utils/enums";
import { useForm } from "react-hook-form";
import { AddTaskType, TaskType } from "../../shared/types";
import { useNavigate } from "react-router-dom";

type taskFormParams = {
  taskFn: (data: AddTaskType | TaskType, taskId?: string) => void;
  action: "addTask" | "editTask";
  taskId: string;
  task?: TaskType | undefined;
};

const TaskForm = ({ taskFn, action, taskId, task }: taskFormParams) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTaskType | TaskType>();

  useEffect(() => {
    if (task) {
      const formattedDate = task.createdDate
        ? new Date(task.createdDate).toISOString().split("T")[0]
        : "";
      reset({
        ...task,
        createdDate: formattedDate,
      });
    }
  }, [task, reset]);

  const onSubmit = handleSubmit((data) => {
    if (action === "editTask" && taskId) {
      taskFn(data, taskId);
    } else {
      taskFn(data);
    }
  });

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/task");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-5">
        <div className="w-full">
          <label htmlFor="title" className="text-gray-700 text-sm font-bold">
            Title
          </label>
          <input
            id="title"
            className="border rounded w-full py-1 px-2 font-normal mt-2"
            {...register("title", { required: "This field is required" })}
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div className="w-full">
          <label
            htmlFor="description"
            className="text-gray-700 text-sm font-bold"
          >
            Description
          </label>
          <textarea
            id="description"
            className="border rounded w-full py-1 px-2 font-normal mt-2"
            {...register("description", { required: "This field is required" })}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>

        <div className="w-full">
          <label className="text-gray-700 text-sm font-bold">Status</label>
          <div className="flex flex-col mt-2">
            {Object.entries(TaskStatusEnum).map(([key, value]) => (
              <label
                htmlFor={`status-${key}`}
                key={key}
                className="flex items-center mb-2"
              >
                <input
                  className="mr-2"
                  type="radio"
                  id={`status-${key}`}
                  value={value}
                  {...register("status", { required: "Status is required" })}
                />
                {value}
              </label>
            ))}
          </div>
          {errors.status && (
            <span className="text-red-500">{errors.status.message}</span>
          )}
        </div>

        <div className="w-full">
          <label htmlFor="priority" className="text-gray-700 text-sm font-bold">
            Priority
          </label>
          <div className="flex">
            <select
              id="priority"
              className="border rounded w-full py-1 px-2 mt-2"
              {...register("priority", { required: "Priority is required" })}
            >
              {Object.entries(TaskPriorityEnum).map(([key, value]) => (
                <option key={key}> {value} </option>
              ))}
            </select>
          </div>
          {errors.priority && (
            <span className="text-red-500">{errors.priority.message}</span>
          )}
        </div>

        <div className="w-full">
          <label
            htmlFor="createdDate"
            className="text-gray-700 text-sm font-bold"
          >
            CreatedDate
          </label>
          <input
            id="createdDate"
            type="date"
            className="border rounded w-full py-1 px-2 font-normal mt-2"
            {...register("createdDate", {
              required: "Created Date is required",
            })}
          />
          {errors.createdDate && (
            <span className="text-red-500">{errors.createdDate.message}</span>
          )}
        </div>

        <div className="w-full">
          <label className="text-gray-700 text-sm font-bold">Tags</label>
          <div className="flex flex-col mt-2">
            {Object.entries(TagsEnum).map(([key, value]) => (
              <label
                key={key}
                htmlFor={value}
                className="flex items-center mb-2"
              >
                <input
                  className="mr-2"
                  type="checkbox"
                  id={value}
                  value={value}
                  {...register("tags", {
                    required: "tags are required",
                  })}
                />
                {value}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <span>
          <button
            title={"Cancel"}
            onClick={handleCancel}
            type="button"
            className="bg-sky-blue text-white p-2 font-bold text-md rounded-md"
          >
            Cancel
          </button>
        </span>

        <span>
          <button
            title={action === "addTask" ? "Create Task" : "Update Task"}
            type="submit"
            className="bg-sky-blue text-white p-2 font-bold text-md rounded-md"
          >
            {action === "addTask" ? "Create Task" : "Update Task"}
          </button>
        </span>
      </div>
    </form>
  );
};

export default TaskForm;
