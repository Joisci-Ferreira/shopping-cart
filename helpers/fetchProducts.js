const fetchProducts = async (computador) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${computador}`;
  try {
  if (!computador) throw new Error('You must provide an url');
  const response = await fetch(url);
  const data = await response.json();
  return data;
  } catch (error) {
  throw new Error(error);
  }
  };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
