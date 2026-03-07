'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLink = ({ children, href }) => {
    const path = usePathname()
    const isActive = path === href
    return (
        <div>
            <Link className={`${isActive ? 'text-primary' : 'text-black'} font-semibold`} href={href}>{children}</Link>
            
        </div>
    );
};

export default NavLink;