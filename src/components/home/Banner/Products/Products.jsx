'use client'
import React, { useEffect, useState } from 'react';
import productData from '../../../../app/data/toys.json'
import ProductCard from '../../ProductCard/ProductCard';
import ProductCardSkeleton from '../../ProductCard/ProductCardSkeleton';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  setTimeout(()=>{
    setProducts(productData);
    setLoading(false);},1500)
  },[])

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {loading?Array(8).fill(0).map((_, index) => (
          <ProductCardSkeleton key={index} />
        )):products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
};

export default Products;