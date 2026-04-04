import React from "react";
import ProductCard from "@/components/home/ProductCard/ProductCard";
import { getProducts } from "@/actions/server/products";

export const metadata = {
  title: "All Products - HeroKidz",
  description:
    "Browse a wide range of toys for kids at HeroKidz. Educational, fun, and safe toys for all ages.",
  openGraph: {
    title: "HeroKidz Toys Collection",
    images: ["https://i.ibb.co.com/Kz814wYP/image.png"],
  },
};
const Products = async () => {
  const productDataFromServer = await getProducts();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {productDataFromServer
        .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
    </div>
  );
};

export default Products;
