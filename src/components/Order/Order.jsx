import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Order = () => {
  const cart = useLoaderData();
  return (
    <div className="md:w-[70%] md:mx-auto grid md:grid-cols-8 md:gap-4 md:my-8">
      {/* Review Item */}
      <div className="md:col-span-5 flex flex-col gap-4 my-4 md:my-0">
        {cart.map((product) => <ReviewItem key={product.id} product={product} />)}
      </div>

      {/* Cart Container */}
      <div className="col-span-3 order-first md:order-last">
        <Cart cart={cart} />
      </div>
    </div>
  );
};

export default Order;
