import { TrashIcon } from '@heroicons/react/24/solid';
import React from 'react';

const ReviewItem = ({ product }) => {
  console.log(product);
  const { img, name, price, quantity } = product;
  return (
    <div className="border rounded-md p-2">
      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <img className="w-20 h-20 rounded-md" src={img} alt="" />
        </div>

        <div className="grow">
          <p className="md:text-lg font-semibold">{name}</p>
          <p>Price: <span className="text-orange-400">${price}</span></p>
          <p>Quantity: <span className="text-orange-400">{quantity}</span></p>
        </div>

        <div className="pl-8 pr-2">
          <button className="bg-red-200 rounded-full p-2">
            <TrashIcon className="h-6 w-6 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
