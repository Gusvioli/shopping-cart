const fetchProducts = async (valor) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${valor}`;
  const results = await fetch(url);
  return results.json();
};

export default fetchProducts;