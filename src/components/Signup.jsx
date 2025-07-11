import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import authService from "../api/auth"
import { Link, useNavigate } from "react-router-dom"
import { Button, Input } from "./index.js"
import { useState } from "react"
import { login } from "../store/authSlice"

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const { register, handleSubmit } = useForm()
    
    const signup = (data) => {
        setError("");
        authService.register(data)
        .then((response) => {
            if(response) {
                dispatch(login(response.data.data));
                
                // Redirect to home page after successful signup
                navigate("/");
            }
        })
        .catch((error) => {
            setError(error.message)
        });
    }
    
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signup)}>
                    <div className='space-y-5'>
                        {/* Full Name */}
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("fullname", { required: true })}
                        />
                        
                        {/* Email */}
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        
                        {/* Username */}
                        <Input
                        label="Username: "
                        placeholder="Enter your username"
                        {...register("username", { required: true })}
                        />
                        
                        {/* Password */}
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", { required: true })}/>
                        
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
