import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Order = () => {
  const cart = useLoaderData();
  const [savedCart, setSavedCart] = useState(cart);

  const handleRemoveFromCart = (id) => {
    const remainingCart = savedCart.filter((item) => item.id !== id);
    setSavedCart(remainingCart);
    removeFromDb(id);
  };

  return (
    <div className="md:w-[70%] md:mx-auto grid md:grid-cols-8 md:gap-4 md:my-8">
      {/* Review Item */}
      <div className="md:col-span-5 flex flex-col gap-4 my-4 md:my-0">
        {savedCart.map((product) => (
          <ReviewItem
            key={product.id}
            product={product}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </div>

      {/* Cart Container */}
      <div className="col-span-3 order-first md:order-last">
        <Cart cart={savedCart} />
      </div>
    </div>
  );
};

export default Order;
