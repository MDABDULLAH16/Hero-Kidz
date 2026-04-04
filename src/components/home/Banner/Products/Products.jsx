 
import React from "react";
import { getProducts } from "@/actions/server/products";
import ProductCard from "../../ProductCard/ProductCard";

const Products = async () => {
  const products = await getProducts();

  return (
    <div className=" "  >
      <div>
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
  </div>
  );
};

export default Products;
