import { fontBangla } from "@/app/layout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className="  mx-auto  py-10">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* Text Section */}
        <div className="space-y-4 text-center lg:text-left max-w-xl">
          <h1
            className={`${fontBangla.className} 
                        text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug`}
          >
            আপনার শিশুকে দিন একটি{" "}
            <span className="text-primary">সুন্দর ভবিষ্যৎ ।</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Buy every toy with 15% discount
          </p>

          <Link href="/products" className="btn btn-primary px-6">
            Shop Now
          </Link>
        </div>

        {/* Image Section */}
        <div className="w-full max-w-md lg:max-w-lg">
          <Image
            src="/assets/hero.png"
            alt="Hero-Kidz"
            width={500}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
