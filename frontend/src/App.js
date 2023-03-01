import React, { useReducer } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'
import './Components/SmallComponents/SearchBar/Search.css'
import './Components/SmallComponents/ShoppingProduct/ShoppingProduct.css';
import './Components/NavBar/NavBar.css'
import './Components/SmallComponents/CategoryButton/CategoryButton.css'
import './Components/SmallComponents/ColorSelector/ColorSelector.css'

import NewNav, { loader as NavLoader } from "./Routes/NewNav"
import NewSearch, { loader as SearchLoader } from "./Routes/NewSearch"
import NewProduct, { loader as NewProductLoader } from "./Routes/NewProduct"
import NewCart, {loader as NewCartLoader} from './Routes/NewCart';

import { editCartItem, getShoppingCart, removeFromCart } from './API/apiCalls';
import { ShoppingCartContext, ShoppingCartDispatchContext } from './Contexts/ShoppingContext';

export const LoginContext = React.createContext();


const router = createBrowserRouter([
  {
    path: "/",
    element: <NewNav />,
    errorElement: <h1>Error???</h1>,
    loader: NavLoader,
    children: [
      {
        path: "/s/:productName",
        element: <NewSearch />,
        errorElement: <h1>Search Failed</h1>,
        loader: SearchLoader,
      },
       {
        path: "/p/:productName/id/:productId",
        element: <NewProduct NavLoader={NavLoader}/>,
        errorElement: <h1>Product Load Failed</h1>,
        loader: NewProductLoader,
      },
      {
        path: "/cart",
        element: <NewCart />,
        errorElement: <h1>Cart Failed to Load</h1>,
        loader: NewCartLoader,
      }
    ]
  }
])

export default function App() {
  const [shoppingCart, dispatch] = useReducer(shoppingCartReducer, [])

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

async function shoppingCartReducer(shoppingCart, action){
  switch(action.type){
    case 'addToCart':{
      console.log(action.type, action.properties)
      return
      // return addToCart(action.properties)
    }
    case 'editCartItem':{
      console.log(action.type, action.properties)
      return
      // return editCartItem(action.properties)
    }
    case 'deleteCartItem':{
      console.log(action.type, action.properties)
      return
      // return removeFromCart(action.properties)
    }
  }
}

