'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

const AuthButton = () => {
    const { data: session, status } = useSession();
    // console.log('session', session);
    return (
        <div>
            {status === 'authenticated' ? (
                <><button onClick={() => signOut()} className='btn btn-primary '>Logout</button></>
            ) : (
                <Link href="/login" className="btn  btn-primary btn-outline">
                    Login
                </Link>
            )}
        </div>
    );
};

export default AuthButton;