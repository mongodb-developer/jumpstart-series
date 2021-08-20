import React from "react";
import Product from "./Product";

const Products = ({ products }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
