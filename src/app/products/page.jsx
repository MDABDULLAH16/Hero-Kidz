import React from "react";
import ProductCard from "@/components/home/ProductCard/ProductCard";
import { getProducts } from "@/actions/server/products";

export const metadata = {
  title: "All Products",
   
  description:
    "Best toy store in Bangladesh. We provide a wide range of toys for kids of all ages. Our toys are made of high-quality materials and are safe for children. We also offer free shipping on all orders over $50.",
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
