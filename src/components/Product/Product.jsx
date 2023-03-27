import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Product = ({ product, cartHandler }) => {
  const { img, name, price, seller, ratings } = product;
  return (
    <div className="card card-compact bg-base-100 shadow-lg rounded-md">
      <figure><img src={img} alt="" /></figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <h3 className="text-lg font-normal">Price: ${price}</h3>
        <p>Manufacturer :{seller}</p>
        <p>Rating : {ratings} Stars</p>
        <div className="card-actions w-full">
          <button onClick={() => cartHandler(product)} type="button" className="btn btn-xs w-[100%]"><span className="mr-2">Add to cart</span> <FontAwesomeIcon icon={faCartShopping} /></button>
        </div>
      </div>
    </div>
  );
};

export default Product;
