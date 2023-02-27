import React from 'react';
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
        element: <NewProduct />,
        errorElement: <h1>Product Load Failed</h1>,
        loader: NewProductLoader,
      }
    ]
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router={router}  />
    </>
  );
}


