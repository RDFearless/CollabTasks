import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "./index.js";
import { useState } from "react";
import { login } from "../store/authSlice";
import parse from "html-react-parser";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();

  const signin = (data) => {
    setError("");
    // Determine if input is email or username and create the appropriate payload
    const isEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
      data.usernameOrEmail
    );
    const loginData = {
      [isEmail ? "email" : "username"]: data.usernameOrEmail,
      password: data.password,
    };
    

    authService
      .login(loginData)
      .then((response) => {
        if (response) {
          dispatch(login(response.data));

          // Redirect to home page after successful login
          navigate("/");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(signin)}>
          <div className="space-y-5">
            {/* Username or Email */}
            <Input
              label="Username or Email: "
              placeholder="Enter your username or email"
              {...register("usernameOrEmail", {
                required: true,
              })}
            />

            {/* Password */}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
