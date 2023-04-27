import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import { FaCreditCard } from "react-icons/fa";
import { toast } from "react-toastify";

const Order = () => {
  const cart = useLoaderData();
  const [savedCart, setSavedCart] = useState(cart);

  const handleRemoveFromCart = (id) => {
    toast("Item delete Successfully", {
      position: toast.POSITION.TOP_CENTER,
    });

    const remainingCart = savedCart.filter((item) => item.id !== id);
    setSavedCart(remainingCart);
    removeFromDb(id);
  };

  const handleClearCart = () => {
    toast("All item delete Successfully", {
      position: toast.POSITION.TOP_CENTER,
    });

    setSavedCart([]);
    deleteShoppingCart();
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
      <div className="md:col-span-3 order-first md:order-last">
        <Cart cart={savedCart} handleClearCart={handleClearCart}>
          <Link to="/checkout">
            <button className="w-full text-white transition-colors duration-200 bg-orange-500 hover:bg-orange-600 rounded-md mt-2">
              <div className="flex justify-between p-2">
                <span>Proceed Checkout</span>
                <FaCreditCard className="h-6 w-6" />
              </div>
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Order;
