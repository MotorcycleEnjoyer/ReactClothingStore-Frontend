import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import axios from 'axios';

import Homepage from './Components/Homepage/Homepage';
import Homepage__PRODUCT from './Components/Homepage/Homepage__PRODUCT';
import Homepage__SEARCH from './Components/Homepage/Homepage__SEARCH';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Cart from './Components/Cart/Cart';
import FileNotFound from './Components/FileNotFound/FileNotFound';

import './App.css'
import './Components/SearchBar/Search.css'
import './Components/ShoppingProduct/ShoppingProduct.css';
import './Components/NavBar/NavBar.css'
import './Components/CategoryButton/CategoryButton.css'

// HELPER FUNCTIONS
import apiCalls from "./apiCalls"

export default function App() {
  const BASE_URL = "http://localhost:5000"
  const [userShoppingCart, setUserShoppingCart] = React.useState("UNDEFINED USER CART")

  function addToCart(dataObjectHeaders){ 
    setUserShoppingCart(apiCalls.addToCart(dataObjectHeaders)) 
  }
  function removeFromCart(index){ 
    setUserShoppingCart(apiCalls.removeFromCart(index)) 
  }
  function getCart(){ 
    setUserShoppingCart(apiCalls.fetchUserShoppingCart())
  }
  
  const propsObject = {
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    logout: apiCalls.logout, 
    cart: userShoppingCart,
  }

  React.useEffect(()=>{
    getCart()
  },[])

  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            { 
              // PREVENT RENDERING UNTIL MAIN APP RECEIVES DATA FROM SERVER!
              userShoppingCart !== "UNDEFINED USER CART" &&
              <>
                <Route path="/" element={<Homepage {...propsObject}/>}/>
                <Route path="/s" element={<Homepage__SEARCH {...propsObject} searchIsDone={true}/>}/>
                <Route path="/p/*" element={<Homepage__PRODUCT {...propsObject} productIsSelected={true}/>}/>
                <Route path="/cart" element={<Cart {...propsObject} cart={userShoppingCart}/>}/>
              </>
              
            }
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/*" element={<FileNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}


