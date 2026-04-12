import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';

const GoogleSignIn = () => {
    const params = useSearchParams();
    const callbackUrl = params.get('callbackUrl') || '/';
    const handleLogin = async() => {
        const result = await signIn("google", {  callbackUrl });
        
        if (result.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: "You have been logged in successfully!",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Google sign-in failed. Please try again.",
                });
            }
    }
    return (
      <button onClick={handleLogin} className="btn btn-outline flex items-center gap-2 w-full border-gray-300">
        <FcGoogle className="text-xl" />
        Sign in with Google
      </button>
    );
};

export default GoogleSignIn;