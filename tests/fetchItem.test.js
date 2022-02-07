require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  test('Verifica se fetchitem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })

  test('Verifica se a função fetch é chamada ao executar a função fetchItem com o argumento "MLB1615760527" ', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  test('Verifica se a função fetch utiliza o endpoint ao executar a função fetchItem com o argumento "MLB1615760527" ', async () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })

  test('Verifica se o retorno da função fetchItem com o argumento "MLB1615760527" é um objeto igual a item', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  })

  test('Verifica se ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    const result = await fetchItem();
    expect(result).toEqual(new Error('You must provide an url'));
  })
});
