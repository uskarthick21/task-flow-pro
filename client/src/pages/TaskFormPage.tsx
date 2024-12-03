import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { addTask, updateTask } from "../config/api";
import { AddTaskType, TaskType } from "../shared/types";
import TaskForm from "../components/Task/TaskForm";
import useGetTaskById from "../hooks/useGetTaskById";

type TaskFormPageParams = {
  action: "addTask" | "editTask";
};

const TaskFormPage = ({ action }: TaskFormPageParams) => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { task, isLoading } = useGetTaskById({ taskId });

  const { mutate: addTaskFn } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["tasks"] }); // Force immediate refetch
      navigate("/task");
    },
  });

  const { mutate: editTaskFn } = useMutation({
    mutationFn: ({ data, taskId }: { data: TaskType; taskId: string }) =>
      updateTask(data, taskId),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["tasks"] }); // Force immediate refetch
      navigate("/task");
    },
  });

  const wrappedTaskFn = (data: AddTaskType | TaskType, taskId?: string) => {
    if (taskId) {
      // If taskId is provided, call editTaskFn
      editTaskFn({ data: data as TaskType, taskId });
    } else {
      // Otherwise, call addTaskFn
      addTaskFn(data as AddTaskType);
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <TaskForm
        taskFn={wrappedTaskFn}
        action={action}
        taskId={taskId || ""}
        task={task}
      />
    </div>
  );
};

export default TaskFormPage;
