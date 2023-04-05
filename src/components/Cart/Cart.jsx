import React from 'react';

const Cart = ({ cart }) => {
  let totalItem = 0;
  let totalPrice = 0;
  let totalShipping = 0;

  for (const product of cart) {
    totalItem += product.quantity;
    totalPrice += product.price * product.quantity;
    totalShipping += product.shipping * product.quantity;
  }

  const tax = (totalPrice * 7) / 100;
  const grandTotal = totalPrice + totalShipping + tax;

  return (
    <div className="bg-cartBg md:sticky md:top-16 rounded-md p-4">
      <div className="my-8">
        <h3 className="text-2xl font-normal text-center">Order Summary</h3>
      </div>
      <div className="space-y-5 mb-8">
        <p>Selected items: {totalItem}</p>
        <p>Total Price: ${totalPrice}</p>
        <p>Total Shipping Charge: ${totalShipping}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <h4 className="text-xl font-normal">Grand Total: ${grandTotal.toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default Cart;
