import axios from 'axios';

// You need to add prefix REACT_APP_ to the variable name:
const options = {
    baseURL: process.env.REACT_APP_TASK_FLOW_APP_BFF_URL,
    withCredentials: true,
};

const API = axios.create(options)

API.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const {status, data} = error.response;
        return Promise.reject({status, ...data})
    }
)

export default API