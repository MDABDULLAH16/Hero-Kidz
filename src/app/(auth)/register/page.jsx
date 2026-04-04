import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6">
            Create Account
          </h2>

          <form className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <div className="input input-bordered flex items-center gap-3">
                <FaUser className="text-gray-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="grow"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <div className="input input-bordered flex items-center gap-3">
                <FaEnvelope className="text-gray-400" />
                <input
                  type="email"
                  placeholder="name@company.com"
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
                  type="password"
                  placeholder="••••••••"
                  className="grow"
                  required
                />
              </div>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary w-full">Sign Up</button>
            </div>
          </form>

          <div className="divider">OR</div>

          <button className="btn btn-outline flex items-center gap-2 w-full border-gray-300">
            <FcGoogle className="text-xl" />
            Sign up with Google
          </button>

          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
