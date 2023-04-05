import { ArrowRightIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, deleteShoppingCart } from '../../utilities/fakedb';
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

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="grid md:grid-cols-7 gap-4 md:mt-8">
      {/* Products Container */}
      <div className="md:col-span-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => <Product key={product.id} product={product} handleAddToCart={handleAddToCart} />)}
        </div>
      </div>

      {/* Cart Container */}
      <div className="md:col-span-2 order-first md:order-last">
        <Cart cart={cart} handleClearCart={handleClearCart}>

          <Link to="/order">
            <button className="w-full text-white transition-colors duration-200 bg-orange-500 hover:bg-orange-600 rounded-md mt-2">
              <div className="flex justify-between p-2">
                <span>Review Order</span>
                <ArrowRightIcon className="h-6 w-6" />
              </div>
            </button>
          </Link>

        </Cart>
      </div>
    </div>
  );
};

export default Shop;
