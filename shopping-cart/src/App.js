import React, { useContext } from 'react';
import Provider from "./context/Provider";
import Context from './context/Context';
// import fetchItem from './helpers/fetchItem';
import fetchProducts from './helpers/fetchProducts';
// import getSavedCartItems from './helpers/getSavedCartItems';
// import saveCartItems from './helpers/saveCartItems';
import { FaTrashAlt } from "react-icons/fa";

function App() {
  const {
    listaProdutos,
    setListaProdutos,
    listaProdutosAdd,
    setListaProdutosAdd,
  } = useContext(Context);

  const carregarItensNaPagina = async () => {
    const retorno = await fetchProducts('computador');
    return setListaProdutos(retorno.results);
  };


  const pegaItemAdd = () => {
    let itensAdd = JSON.parse(localStorage.getItem('listaProdutosAdd'));
    if (itensAdd === null) localStorage.setItem('listaProdutosAdd', JSON.stringify([]));
    return itensAdd;
  };
  carregarItensNaPagina();

  const addItem = (maId) => {
    const ver = pegaItemAdd();
    setListaProdutosAdd([...listaProdutosAdd, maId]);
    if (ver !== null) localStorage.setItem('listaProdutosAdd', JSON.stringify([
      ...ver, maId
    ]));
  };

  const retirarItens = (e) => {
    const ver = pegaItemAdd();
    setListaProdutosAdd([
      ...listaProdutosAdd.filter((PAdd) => PAdd.id !== e.id)
    ]);
    if (ver !== null) localStorage.setItem('listaProdutosAdd', JSON.stringify([
      ...ver.filter((PAdd) => PAdd.id !== e.id)
    ]));
    console.log(ver);
  };

  const formatarValorDinheiro = (valor) => {
    return valor.toLocaleString('pt-br',
      { style: 'currency', currency: 'BRL' });
  };


  const esvasiarCarrinho = () => {
    setListaProdutosAdd([]);
    localStorage.setItem('listaProdutosAdd', JSON.stringify([]));
  };

  const exibirItensAdd = () => {
    const ver = pegaItemAdd();
    if (ver !== null) {
      return ver.map((ma, i) =>
        <li className="cart__item" key={i}>
          <img src={ma.thumbnail} alt={ma.thumbnail} width='50px' />
          {/* <span className=''>{ma.id}</span> */}
          <span className='add__title'>{ma.title}</span>
          <span className='add__salePrice'>{formatarValorDinheiro(ma.salePrice)}</span>
          <span className='remove_itens_icon' onClick={() => retirarItens({
            id: ma.id,
            title: ma.title,
            thumbnail: ma.thumbnail,
            salePrice: ma.price,
          })}
          >
            <FaTrashAlt />
          </span>
        </li>
      );
    }
  };
  const somarCarrinho = () => {
    const prince = pegaItemAdd();
    let dinheiro = prince.reduce((acc, add) => acc + add.salePrice, 0);
    return formatarValorDinheiro(dinheiro);
  };

  const createProductItemElement = (listaProdutos) => {
    return listaProdutos.map((ma, i) =>
      <section className="item" key={i}>
        <img src={ma.thumbnail} alt={ma.thumbnail} width='100px' />
        <span className='item__sku'>{ma.id}</span>
        <span className='item__title'>{ma.title}</span>
        <span className='item__salePrice'>{formatarValorDinheiro(ma.price)}</span>
        <button className='item__add' onClick={() => addItem(
          {
            id: `${ma.id}-${listaProdutosAdd.length}`,
            title: ma.title,
            thumbnail: ma.thumbnail,
            salePrice: ma.price,
          })
        }>Adicionar ao carrinho!</button>
      </section>
    );
  };

  return (
    <Provider>
      <header className="header">
        <div className="container-title">
          <span className="title"><strong></strong>shopping</span>
        </div>
        <i className="material-icons" >shopping_cart
          <span className='material-icons-qtds'>{pegaItemAdd().length}</span>
        </i>
        <div className="container-cartTitle">
          <span className="cart__title">Meu carrinho</span>
        </div>
      </header>
      <section className="loading-aqui"></section>
      <section className="container">
        <section className="items">{createProductItemElement(listaProdutos)}</section>
        <section className="cart">
          <ol className="cart__items">{exibirItensAdd()}</ol>
          <section className="calculo">Total no carrinho:
            <span className="total-price">
              {somarCarrinho()}
            </span>
          </section>
          <button className="empty-cart" onClick={esvasiarCarrinho}>Esvaziar carrinho</button>
          <section className="total-price"></section>
        </section>
      </section>
    </Provider>
  );
}

export default App;
