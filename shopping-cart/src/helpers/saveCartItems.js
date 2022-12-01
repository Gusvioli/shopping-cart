const saveCartItems = (setItem) => {
  const localSet = localStorage.setItem('cartItems', setItem);
  return localSet;
};

export default saveCartItems;
