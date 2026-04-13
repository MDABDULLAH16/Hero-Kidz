"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import GoogleSignIn from "@/components/buttons/GoogleSignIn";

const Login = () => {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') || '/';
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
   redirect: false,
   
    });
    if (result.ok) {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have been logged in successfully!",
      });
router.push(callbackUrl)
 
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
      });
    }

    
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <div className="input input-bordered flex items-center gap-3">
                <FaEnvelope className="text-gray-400" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="email@example.com"
                  className="grow"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="input input-bordered flex items-center gap-3">
                <FaLock className="text-gray-400" />
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="grow"
                  required
                />
              </div>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary w-full">Login</button>
            </div>
          </form>

          <div className="divider">OR</div>

         <GoogleSignIn></GoogleSignIn>

          <p className="text-center mt-6 text-sm">
            Don't have an account?{" "}
            <Link
              href={`/register?callbackUrl=${callbackUrl}`}
              className="text-primary font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
