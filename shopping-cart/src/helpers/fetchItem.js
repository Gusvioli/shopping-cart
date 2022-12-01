const fetchItem = async (valor) => {
  const url = `https://api.mercadolibre.com/items/${valor}`;
  const promessafetch = await fetch(url);
  return promessafetch.json();
};

export default fetchItem;
