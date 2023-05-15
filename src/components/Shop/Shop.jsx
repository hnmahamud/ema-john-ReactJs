import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { addToDb, deleteShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { totalProducts } = useLoaderData();
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // const pageNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pageNumbers.push(i);
  // }
  const pageNumbers = [...Array(totalPages).keys()];

  const option = [5, 10, 15, 20];
  const handleChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://ema-john-server-xi.vercel.app/products?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
        );
        const { data } = response;
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const newCart = [];
    const storedCart = JSON.parse(localStorage.getItem("shopping-cart"));
    if (storedCart) {
      const ids = Object.keys(storedCart);

      fetch("https://ema-john-server-xi.vercel.app/productsByIds", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ids: ids }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            for (const id in storedCart) {
              const foundProduct = data.find((pd) => id === pd._id);
              const cartItemQuantity = storedCart[id];
              foundProduct.quantity = cartItemQuantity;
              newCart.push(foundProduct);
            }
            setCart(newCart);
          }
        });
    }
  }, []);

  const handleAddToCart = (product) => {
    toast("Product added Successfully", {
      position: toast.POSITION.TOP_CENTER,
    });

    let newCart = [];
    const isExist = cart.find((pd) => pd._id === product._id);
    if (isExist) {
      isExist.quantity += 1;
      const remainingProduct = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remainingProduct, isExist];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDb(product._id);
  };

  const handleClearCart = () => {
    toast("All item delete Successfully", {
      position: toast.POSITION.TOP_CENTER,
    });

    setCart([]);
    deleteShoppingCart();
  };

  return (
    <>
      <div className="grid md:grid-cols-7 gap-4 md:mt-8">
        {/* Products Container */}
        <div className="md:col-span-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Product
                key={product._id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        {/* Cart Container */}
        <div className="md:col-span-2 order-first md:order-last">
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link to="/order">
              <button className="w-full text-white transition-colors duration-200 bg-orange-500 hover:bg-orange-600 rounded-md mt-2">
                <div className="flex justify-between p-2">
                  <span>Review Order</span>
                  <FaArrowRight className="h-6 w-6" />
                </div>
              </button>
            </Link>
          </Cart>
        </div>
      </div>
      <div className="text-center space-x-2 my-8">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            type="button"
            className={`${
              number === currentPage ? "bg-blue-700 text-white" : ""
            } border border-blue-700 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center`}
          >
            {number + 1}
          </button>
        ))}
        <select
          className="border border-blue-700 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center"
          onChange={handleChange}
          value={itemsPerPage}
        >
          {option.map((op, index) => (
            <option key={index}>{op}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
