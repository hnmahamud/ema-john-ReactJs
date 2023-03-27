import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const response = await axios.get('/public/products.json');
      const { data } = response;
      setProducts(data);
    };
    loadProducts();
  }, []);

  const cartHandler = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
  };

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-4 w-[90%] mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-16">
          {products.map((product) => <Product key={product.id} product={product} cartHandler={cartHandler} />)}
        </div>
      </div>
      <div className="bg-cartBg col-span-1">
        <div className="w-[80%] mx-auto">
          <h3 className="text-2xl font-normal text-center my-7">Order Summary</h3>
          <p>Selected items: {cart.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Shop;
