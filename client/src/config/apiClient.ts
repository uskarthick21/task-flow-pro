import axios from 'axios';
import { navigate } from './navigation';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
        },
    },
});

// You need to add prefix REACT_APP_ to the variable name:
const options = {
    baseURL: process.env.REACT_APP_TASK_FLOW_APP_BFF_URL,
    withCredentials: true,
};

const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

const API = axios.create(options)

API.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        //console.log("Error:", JSON.stringify(error, null, 4));

        const { config, response } = error;
        const { status, data } = response || {};

        // try to refresh the access token behind the scenes
        if (status === 401 && data?.errorCode === "InvalidAccessToken") {
            try {
                await TokenRefreshClient.get("/auth/refresh");
                // after get accessToken from above then retry the original request from the error config. That what below code doing.
                return TokenRefreshClient(config);
            } catch (error) {
                queryClient.clear();
                localStorage.removeItem('isLoggedIn');
                navigate("/login", {
                    state: {
                        redirectUrl: window.location.pathname,
                    }
                })
            }
        }

        return Promise.reject({ status, ...data })
    }
)

export default API