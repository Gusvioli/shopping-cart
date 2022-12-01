require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  try {
    it('Teste se fetchItem é uma função', () => {
      expect(typeof fetchItem).toBe('function');
    });
    it('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async() => {
      await fetchItem('MLB1615760527');
      expect(fetch).toHaveBeenCalled();
    });
    it('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async() => {
      const endP = 'https://api.mercadolibre.com/items/MLB1615760527';
      await fetchItem('MLB1615760527');
      expect(fetch).toHaveBeenCalledWith(endP);
    });
    it('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async() => {
      const retorno = await fetchItem('MLB1615760527');
      expect(retorno).toEqual(item);
    });
    it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async() => {
      const retorno = await fetchItem();
      expect(retorno).toEqual(Error('You must provide an url'));
    });
  } catch (error) {
    return error;
  }
});
