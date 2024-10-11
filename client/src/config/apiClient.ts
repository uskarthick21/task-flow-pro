import axios from 'axios';

// You need to add prefix REACT_APP_ to the variable name:
// baseURL: process.env.REACT_APP_TASK_FLOW_APP_BFF_URL || '' , if there is no base url in production then just same server for all request. thats why given like REACT_APP_TASK_FLOW_APP_BFF_URL  || ''
const options = {
    baseURL: process.env.REACT_APP_TASK_FLOW_APP_BFF_URL || '',
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