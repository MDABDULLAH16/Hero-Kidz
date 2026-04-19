import AuthButton from '@/components/buttons/AuthButton';
import Logo from '@/components/buttons/Logo/Logo';
import NavLink from '@/components/buttons/NavLink';
import Link from 'next/link';
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

const Navbar = () => {
    const nav = <>
    <li><NavLink href="/">Home</NavLink></li>
    <li><NavLink href="/products">Products</NavLink></li>
    <li><NavLink href="/about">About</NavLink></li>
    <li><NavLink href="/contact">Contact</NavLink></li>
    <li><NavLink href="/cart">Cart</NavLink></li>
    </>
    return (
      <div>
        <div className="navbar bg-base-100 ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
               {nav}
              </ul>
            </div>
            <Logo/>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
                {nav}
            </ul>
          </div>
                <div className="navbar-end gap-3">
                    <Link className='btn btn-primary text-xl space-x-4' href="/cart"><FiShoppingCart /> </Link>
          <AuthButton></AuthButton>
          </div>
        </div>
      </div>
    );
};

export default Navbar;