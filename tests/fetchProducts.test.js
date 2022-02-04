require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  test('Verifica-se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  test(`Verifica-se a função fetchProducts é executada com o argumento 'Computador'`, async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled()
  })
  test('Verifica-se a API do Mercado Livre está sendo chamado quando o argumento for computador', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  });

  test('Verifica-se está sendo retornado uma estrutura de dados igual ao Objeto ', async () => {
    const consulta = await fetchProducts('computador');
    expect(consulta).toBe(computadorSearch);
  });
  test('Verifica-se fetchProducts for chamado sem nenhum parametro, ira retornar', async () => {
    expect(fetchProducts()).rejects.toThrow('You must provide an url');
  });
});
