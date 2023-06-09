import React from "react";
import { FaCartPlus } from "react-icons/fa";

const Product = ({ product, handleAddToCart }) => {
  const { img, name, price, seller, ratings } = product;
  return (
    <div className="bg-base-100 border rounded-md flex flex-col">
      <div className="p-2">
        <img className=" rounded-md" src={img || ""} alt="" />
      </div>
      <div className="p-4">
        <div className="mb-3">
          <h2 className="font-bold text-xl">{name}</h2>
          <h3 className="font-normal text-lg">Price: ${price}</h3>
        </div>
        <div className="mb-12">
          <p>Manufacturer :{seller}</p>
          <p>Rating : {ratings} Stars</p>
        </div>
      </div>
      <div className="w-full mt-auto">
        <button
          onClick={() => handleAddToCart(product)}
          type="button"
          className="w-[100%] text-black bg-addCartBtnBg hover:bg-orange-300 border-0 p-2 rounded-b-md"
        >
          <div className="flex justify-center">
            <span className="mr-2">Add to cart</span>
            <FaCartPlus className="h-6 w-6" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Product;
