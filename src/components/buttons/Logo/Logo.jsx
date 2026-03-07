import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="text-nowrap text-xl font-bold flex items-center gap-2">
      <Image
        src="/assets/logo.png"
        alt="Logo"
        width={40}
        height={40}
        className=""
          />
        Hero Kidz
    </Link>
  );
};

export default Logo;
