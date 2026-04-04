"use client";
import React from "react";

const Loading = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="card bg-base-100 shadow-md">
            <div className="skeleton h-[220px] w-full"></div>

            <div className="card-body space-y-3">
              <div className="skeleton h-4 w-3/4"></div>

              <div className="skeleton h-4 w-1/2"></div>

              <div className="flex justify-between">
                <div className="skeleton h-4 w-16"></div>
                <div className="skeleton h-4 w-12"></div>
              </div>

              <div className="flex gap-2">
                <div className="skeleton h-8 flex-1"></div>
                <div className="skeleton h-8 flex-1"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Loading;
