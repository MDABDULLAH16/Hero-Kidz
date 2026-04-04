'use client'
import Link from 'next/link';
import React from 'react';
import { BiSolidError } from 'react-icons/bi';

const error = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <BiSolidError className="text-6xl text-primary" />
        <p className="text-lg">Something went Wrong!</p>
        <Link href="/" className="mt-4 px-4 py-2 btn btn-primary  transition">
          Go Back Home
        </Link>
      </div>
    );
};

export default error;