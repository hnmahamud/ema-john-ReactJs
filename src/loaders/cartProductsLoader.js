import axios from 'axios';

const cartProductsLoader = async () => {
  const loadedProducts = await axios.get('products.json');
  const { data } = loadedProducts;

  const newCart = [];
  if (data.length > 0) {
    const storedCart = JSON.parse(localStorage.getItem('shopping-cart'));
    for (const id in storedCart) {
      const foundProduct = data.find((pd) => id === pd.id);
      const cartItemQuantity = storedCart[id];
      foundProduct.quantity = cartItemQuantity;
      newCart.push(foundProduct);
    }
  }
  return newCart;
};

export default cartProductsLoader;
