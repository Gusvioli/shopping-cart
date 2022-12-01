import React, { useState } from "react";
import Context from "./Context";

function Provider({ children }) {
  const [listaProdutos, setListaProdutos] = useState([]);
  const [listaProdutosAdd, setListaProdutosAdd] = useState([]);
  const [somaProdutos, setSomaProdutos] = useState([]);
  return (
    <Context.Provider value={{
      listaProdutos,
      setListaProdutos,
      listaProdutosAdd,
      setListaProdutosAdd,
      somaProdutos,
      setSomaProdutos,
    }}>
      {children}
    </Context.Provider>
  );
}

export default Provider;