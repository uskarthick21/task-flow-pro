import { getTaskById } from "../config/api";
import { useQuery } from "@tanstack/react-query";

type useGetTaskByIdParam = {
    taskId: string | undefined
}

const useGetTaskById = ({ taskId }: useGetTaskByIdParam) => {
    const isEditMode = Boolean(taskId);
    const { data: task, isLoading, isError, error } = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => {
            if (!taskId) {
                return undefined
            }
            return getTaskById(taskId)
        },
        enabled: isEditMode,
    })

    return {
        task,
        isLoading,
        isError,
        error
    }
}

export default useGetTaskById;