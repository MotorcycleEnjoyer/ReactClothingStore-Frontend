import React, { useReducer } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'
import './Components/SmallComponents/SearchBar/Search.css'
import './Components/SmallComponents/ShoppingProduct/ShoppingProduct.css';
import './Components/NavBar/NavBar.css'
import './Components/SmallComponents/CategoryButton/CategoryButton.css'
import './Components/SmallComponents/ColorSelector/ColorSelector.css'

import NewNav from "./Routes/NewNav"
import NewSearch, { loader as SearchLoader } from "./Routes/NewSearch"
import NewProduct, { loader as NewProductLoader } from "./Routes/NewProduct"
import NewCart, {loader as NewCartLoader} from './Routes/NewCart';

import { editCartItem, getShoppingCart, removeFromCart, addToCart } from './API/apiCalls';
import { ShoppingCartContext, ShoppingCartDispatchContext } from './Contexts/ShoppingContext';

export const LoginContext = React.createContext();

export default function App() {
  const [shoppingCart, dispatch] = useAsyncReducer(shoppingCartReducer, [])
  React.useEffect(()=>{
    dispatch({
      type: 'getCart'
    })
  },[])

  return (
    <>
    <ShoppingCartContext.Provider value={shoppingCart}>
      <ShoppingCartDispatchContext.Provider value={dispatch}>
        <RouterProvider router={router}  />
      </ShoppingCartDispatchContext.Provider>
    </ShoppingCartContext.Provider>
    </>
  );
}

/*
Credit for the useAsyncReducer goes to:
https://medium.com/@patrick.gross1987/how-to-use-the-react-context-api-with-an-asynchronous-reducer-5651c2dc26aa
*/
const useAsyncReducer = (reducer, initialState) => {
  const [state, setState] = React.useState(initialState)

  const dispatch = async action => {
    const result = reducer(state, action)
    if(typeof result.then === "function"){
      try{
        const newState = await result;
        setState(newState);
      } catch(err){
        setState({...state, error: err})
      }
    }else{
      setState(result)
    }
  }

  return [state, dispatch]
}

function shoppingCartReducer(shoppingCart, action){
  switch(action.type){
    case 'getCart':{
      return getShoppingCart()
    }
    case 'addToCart':{
      return addToCart(action.properties)
    }
    case 'editCartItem':{
      return editCartItem(action.properties)
    }
    case 'deleteCartItem':{
      return removeFromCart(action.properties)
    }
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <NewNav />,
    errorElement: <h1>Error???</h1>,
    // loader: NavLoader,
    children: [
      {
        path: "/s/:productName",
        element: <NewSearch />,
        errorElement: <h1>Search Failed</h1>,
        loader: SearchLoader,
      },
       {
        path: "/p/:productName/id/:productId",
        element: <NewProduct />,
        errorElement: <h1>Product Load Failed</h1>,
        loader: NewProductLoader,
      },
      {
        path: "/cart",
        element: <NewCart />,
        errorElement: <h1>Cart Failed to Load</h1>,
        // loader: NewCartLoader,
      }
    ]
  }
])