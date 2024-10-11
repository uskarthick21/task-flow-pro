import {useForm} from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerForm } from "../config/api";
import { useNavigate } from "react-router";

export type RegisterFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}

const Register = () => {
    const navigate = useNavigate();
    const {register, watch, handleSubmit, formState: {errors}} = useForm<RegisterFormData>();

    const {
        mutate: createAccount
      } = useMutation({
        mutationFn: registerForm,
        onSuccess: () => {
          console.log("Registration success")
          navigate("/");
        },
      });

    const onSubmit = handleSubmit((data) => {
        createAccount(data)
    });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-1/2">
                <label htmlFor="firstName" className="text-gray-700 text-sm font-bold">
                    First Name
                </label>
                <input id="firstName" 
                className="border rounded w-full py-1 px-2 font-normal mt-2"
                {...register("firstName", {required: "This field is required"})} />
                {
                    errors.firstName && (
                        <span className="text-red-500">
                            {errors.firstName.message}
                        </span>
                    )
                }
            </div>
            <div className="w-full md:w-1/2">
                <label htmlFor="lastName" 
                className="text-gray-700 text-sm font-bold">
                    Last Name
                </label>
                <input id="lastName" 
                className="border rounded w-full py-1 px-2 font-normal mt-2"
                {...register("lastName", {required: "This field is required"})}
                />
                {
                    errors.lastName && (
                        <span className="text-red-500">
                            {errors.lastName.message}
                        </span>
                    )
                }
            </div>
           
        </div>
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
                <label htmlFor="confirmPassword" 
                className="text-gray-700 text-sm font-bold">
                    ConfirmPassword
                </label>
                <input id="confirmPassword" 
                type="password"
                className="border rounded w-full py-1 px-2 font-normal mt-2"
                {...register("confirmPassword",
                    {
                        validate: (val) => {
                            if(!val) {
                                return "This field is required";
                            } else if (watch("password") !== val) {
                                return "Your passwords do no match";
                            }
                        }
                    }
                )}
                />
                {
                    errors.confirmPassword && (
                        <span className="text-red-500">
                            {errors.confirmPassword.message}
                        </span>
                    )
                }
            </div>
            <span>
                <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
                    Create Account
                </button>
            </span>
    </form>
  )
}

export default Register
