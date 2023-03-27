export const addToDb = (id) => {
  let shoppingCart = {};

  const isCartAvailable = JSON.parse(localStorage.getItem('shopping-cart'));
  if (isCartAvailable) {
    // const isQuantityAvailable = isCartAvailable[id];
    if (id in isCartAvailable) {
      isCartAvailable[id] += 1;
      shoppingCart = { ...isCartAvailable };
    } else {
      shoppingCart = { ...isCartAvailable, [id]: 1 };
    }
  } else {
    shoppingCart = { [id]: 1 };
  }

  localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
};


export const removeFromDb = (id) => {
  const isCartAvailable = JSON.parse(localStorage.getItem('shopping-cart'));
  if (isCartAvailable && id in isCartAvailable) {
    delete isCartAvailable[id];
    localStorage.setItem('shopping-cart', JSON.stringify(isCartAvailable));
  }
};


export const deleteShoppingCart = () => {
  localStorage.removeItem('shopping-cart');
};
