import {useForm} from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginForm } from "../config/api";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export type LoginFormData = {
    email: string,
    password: string,
}

const Login = () => {
    const navigate = useNavigate();
    const {register, watch, handleSubmit, formState: {errors}} = useForm<LoginFormData>();

    const {
        mutate: createAccount
      } = useMutation({
        mutationFn: loginForm,
        onSuccess: () => {
          console.log("Login success")
          navigate("/", {
            replace: true
          });
        },
      });

    const onSubmit = handleSubmit((data) => {
        createAccount(data)
    });

  return (
    <form className="w-full max-w-screen-sm flex flex-col overflow-y-auto gap-5 border-2 rounded-md shadow-md p-5" onSubmit={onSubmit}>
         
        <h2 className="text-3xl font-medium text-center">Login to your Account</h2>
           
            <div className="w-full">
                <label htmlFor="email" 
                className="text-gray-700 text-sm font-bold">
                    Email
                </label>
                <input id="email" 
                type="email"
                className="border rounded w-full py-1 px-2 font-normal mt-2"
                {...register("email", {required: "This field is required"})}
                />
                {
                    errors.email && (
                        <span className="text-red-500">
                            {errors.email.message}
                        </span>
                    )
                }
            </div>
            <div className="w-full">
                <label htmlFor="password" 
                className="text-gray-700 text-sm font-bold">
                    Password
                </label>
                <input id="password" 
                type="password"
                className="border rounded w-full py-1 px-2 font-normal mt-2"
                {...register("password", {
                    required: "This field is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                    }
                })}
                />
                {
                    errors.password && (
                        <span className="text-red-500">
                            {errors.password.message}
                        </span>
                    )
                }
            </div>
            
            <div className="w-full">

            <span className="flex flex-col justify-center gap-5">
                <button type="submit" className="bg-black text-white p-2 font-bold text-md rounded-md">
                    Login
                </button>
                <span>
                Don't have account      
                <Link className="underline font-bold pl-2" to="/register">
                Create an account here
                </Link>
            </span>
            </span>

           
            </div>
           
          
    </form>
  )
}

export default Login
