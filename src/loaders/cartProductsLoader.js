import axios from "axios";

const cartProductsLoader = async () => {
  const newCart = [];
  const storedCart = JSON.parse(localStorage.getItem("shopping-cart"));
  if (storedCart) {
    const ids = Object.keys(storedCart);

    const payload = { ids };
    const loadedProducts = await axios.post(
      "https://ema-john-server-xi.vercel.app/productsByIds",
      payload
    );
    const { data } = loadedProducts;

    if (data.length > 0) {
      const storedCart = JSON.parse(localStorage.getItem("shopping-cart"));
      for (const id in storedCart) {
        const foundProduct = data.find((pd) => id === pd._id);
        const cartItemQuantity = storedCart[id];
        foundProduct.quantity = cartItemQuantity;
        newCart.push(foundProduct);
      }
    }
  }
  return newCart;
};

export default cartProductsLoader;
