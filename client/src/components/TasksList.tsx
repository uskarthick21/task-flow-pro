import { TaskStatusEnum } from "../utils/enums";
import { TaskType } from "../shared/types";
import TaskCard from "./TaskCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../config/api";
import { useNavigate } from "react-router";

type TaskStatusCardProps = {
  status: TaskStatusEnum;
  tasks: TaskType[] | undefined;
};

const TasksList = ({ status, tasks = [] }: TaskStatusCardProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteFn } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["tasks"] });
      navigate("/task");
    },
  });

  const taskByStatus = tasks?.filter((task) => {
    return task.status === status;
  });

  return (
    <div key={status} className="bg-white w-full lg:w-1/4 p-4">
      <h3 className="border-b border-white-smoke pb-4 text-center font-bold text-lg">
        {status}
      </h3>
      {taskByStatus?.map((task) => {
        return <TaskCard key={task._id} task={task} deleteFn={deleteFn} />;
      })}
    </div>
  );
};

export default TasksList;
