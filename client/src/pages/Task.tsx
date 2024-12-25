import { LuPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { alltasks } from "../config/api";
import { TaskStatusEnum } from "../utils/enums";
import TasksList from "../components/Task/TasksList";

const Task = () => {
  const { data: tasksList } = useQuery({
    queryKey: ["tasks"],
    queryFn: alltasks,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const taskStatuses = Object.values(TaskStatusEnum);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl text-black font-confort font-medium flex items-center justify-center">
          Task
        </h1>
        <Link
          to="/task/add"
          title="Add New"
          className="bg-sky-blue flex items-center justify-center rounded text-white text-md px-4 py-2 gap-2"
        >
          <LuPlus className="text-white text-md" />
          Add New
        </Link>
      </div>
      <div className="pt-6">
        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4">
          {taskStatuses.map((status) => {
            return <TasksList key={status} status={status} tasks={tasksList} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Task;
