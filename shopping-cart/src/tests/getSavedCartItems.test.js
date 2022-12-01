const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  if (typeof localStorage.getItem === 'undefined') return new Error('setItem não foi definido');
  try {
    test('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
      getSavedCartItems('cartItems');
      expect(localStorage.getItem).toHaveBeenCalled();
    });
    test('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro', () => {
      getSavedCartItems('cartItems');
      expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
    });
  } catch (error) {
    return error;
  }
});
