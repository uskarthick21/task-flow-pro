import React from "react";
import { TaskStatusEnum } from "../utils/enums";
import { useQuery } from "@tanstack/react-query";
import { tasks } from "../config/api";
import TasksList from "./TasksList";

const TaskStatusList = () => {
  const { data: tasksList } = useQuery({
    queryKey: ["tasks"],
    queryFn: tasks,
    refetchOnMount: false, // Prevent refetch on component remount
    refetchOnWindowFocus: false, // Prevent refetch when window regains focus
  });
  const taskStatuses = Object.values(TaskStatusEnum);

  return (
    <>
      {taskStatuses.map((status) => {
        return <TasksList key={status} status={status} tasks={tasksList} />;
      })}
    </>
  );
};

export default TaskStatusList;
