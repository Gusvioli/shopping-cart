const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  if (typeof localStorage.setItem === 'undefined') return new Error('setItem não foi definido');
  try {
    const olLiItem = ['cartItems', '<ol><li>Item</li></ol>'];
    test('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
      saveCartItems(olLiItem[0]);    
      expect(localStorage.setItem).toHaveBeenCalled();
    });
    test('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems', () => {
      saveCartItems(olLiItem[1]);
      expect(localStorage.setItem).toHaveBeenCalledWith(olLiItem[0], olLiItem[1]);
    });
  } catch (error) {
    return error;
  }
});
