import { NavigateFunction } from "react-router";

export let navigate:NavigateFunction  = () => {};

export const setNavigate = (fn: NavigateFunction ) => {
    navigate = fn
}