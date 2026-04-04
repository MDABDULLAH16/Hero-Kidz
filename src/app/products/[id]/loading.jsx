import React from "react";

const Loading = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-10 animate-pulse">
      {/* Image Skeleton */}
      <div className="bg-gray-200 h-[400px] w-full rounded-xl"></div>

      {/* Product Info Skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 w-3/4 rounded"></div>

        <div className="h-4 bg-gray-200 w-1/2 rounded"></div>

        <div className="h-5 bg-gray-200 w-32 rounded"></div>

        <div className="h-8 bg-gray-200 w-48 rounded"></div>

        <div className="flex gap-3">
          <div className="h-10 bg-gray-200 flex-1 rounded"></div>
          <div className="h-10 bg-gray-200 flex-1 rounded"></div>
        </div>

        <div className="h-24 bg-gray-200 w-full rounded"></div>
      </div>

      {/* Description Skeleton */}
      <div className="md:col-span-2 h-40 bg-gray-200 rounded"></div>

      {/* QNA Skeleton */}
      <div className="md:col-span-2 h-40 bg-gray-200 rounded"></div>
    </div>
  );
};

export default Loading;
