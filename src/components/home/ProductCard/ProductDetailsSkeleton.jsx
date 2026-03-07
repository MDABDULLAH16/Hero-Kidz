const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-10">
      <div className="skeleton h-[400px] w-full"></div>

      <div className="space-y-4">
        <div className="skeleton h-6 w-3/4"></div>
        <div className="skeleton h-4 w-1/2"></div>

        <div className="skeleton h-5 w-40"></div>

        <div className="skeleton h-8 w-48"></div>

        <div className="flex gap-3">
          <div className="skeleton h-10 flex-1"></div>
          <div className="skeleton h-10 flex-1"></div>
        </div>

        <div className="skeleton h-24 w-full"></div>
      </div>

      <div className="md:col-span-2 skeleton h-40 w-full"></div>

      <div className="md:col-span-2 skeleton h-40 w-full"></div>
    </div>
  );
};

export default ProductDetailsSkeleton;
