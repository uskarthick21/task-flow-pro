import { useQuery } from "@tanstack/react-query"
import { getUser } from "../config/api";

export const AUTH = "auth"

const useAuthUser = (opts = {}) => {

    const { data: user, ...rest } = useQuery({
        queryKey: [AUTH],
        queryFn: getUser,
        staleTime: 0,
        refetchOnWindowFocus: false, // Prevent refetch when window regains focus
        ...opts
    });

    return {
        user, ...rest
    }

}
export default useAuthUser;