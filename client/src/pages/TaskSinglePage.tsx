import { useParams, useNavigate } from "react-router";
import TaskSingle from "../components/Task/TaskSingle";
import useGetTaskById from "../hooks/useGetTaskById";

const TaskSinglePage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const { task, error, isError, isLoading } = useGetTaskById({ taskId });

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return <TaskSingle task={task} navigate={navigate} />;
};

export default TaskSinglePage;
