import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { addToDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get('products.json');
        const { data } = response;
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const newCart = [];
      const storedCart = JSON.parse(localStorage.getItem('shopping-cart'));
      for (const id in storedCart) {
        const foundProduct = products.find((pd) => id === pd.id);
        const cartItemQuantity = storedCart[id];
        foundProduct.quantity = cartItemQuantity;
        newCart.push(foundProduct);
      }
      setCart(newCart);
    }
  }, [products]);

  const handleAddToCart = (product) => {
    let newCart = [];
    const isExist = cart.find((pd) => pd.id === product.id);
    if (isExist) {
      isExist.quantity += 1;
      const remainingProduct = cart.filter((pd) => pd.id !== product.id);
      newCart = [...remainingProduct, isExist];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDb(product.id);
  };

  return (
    <div className="grid grid-cols-5">
      {/* Products Container */}
      <div className="col-span-4 w-[90%] mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-16">
          {products.map((product) => <Product key={product.id} product={product} handleAddToCart={handleAddToCart} />)}
        </div>
      </div>

      {/* Cart Container */}
      <div className="bg-cartBg col-span-1">
        <div className="w-[80%] mx-auto sticky top-0">
          <Cart cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
