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

export default function App() {


const BASE_URL = "http://localhost:5000"
const LOGOUT_URL = BASE_URL + "/logout"
const LOGIN_URL = BASE_URL + "login"
const DELETION_URL = BASE_URL + "/deleteCartItem"
const ADD_TO_CART_URL = BASE_URL + "/addToCart"
const GET_CART_URL = BASE_URL + "/shoppingCart"
const EDIT_CART_URL = BASE_URL + "/editCartItem"

function fetchUserShoppingCart(){
    axios.get(GET_CART_URL, {withCredentials: true})
    .then(response => {
        if(response.data.shoppingCart === undefined){
            setUserShoppingCart([])
        }
        else{
            setUserShoppingCart(response.data.shoppingCart)
        }
    }).catch(error => console.error(error))
  }

function logout(){
    axios.post(LOGOUT_URL, {dummy: 2}, {withCredentials: true})
    .then(response => {
      alert(response.data)
      if(response.data === "POST/logout: Logged out successfully!")
      {
        window.location = "/"
      }
    })
    .catch(error => console.error(error))
  }

function removeFromCart(index){
    console.log(index)
    axios.post(DELETION_URL, {indexOfCartItem: index}, {withCredentials: true})
    .then(response => {
        setUserShoppingCart(response.data.shoppingCart)
    })
    .catch(error => console.error(error))
  }

function addToCart(dataObjectHeaders){
    axios.post(ADD_TO_CART_URL, dataObjectHeaders, {withCredentials: true})
    .then(response => {
        let fadeModalContent = document.querySelector(".fadeModal--content")
        fadeModalContent.innerText = response.data
        fetchUserShoppingCart()
    })
    .catch(error => console.error(error))
  }

  function editCartItem(dataObjectHeaders){
    axios.post(EDIT_CART_URL, dataObjectHeaders, {withCredentials: true})
    .then(response => {
      let fadeModalContent = document.querySelector(".fadeModal--content")
      fadeModalContent.innerText = response.data
      fetchUserShoppingCart()
    }).catch(error => console.error(error))
  }

  const [userShoppingCart, setUserShoppingCart] = React.useState("UNDEFINED USER CART")

  const propsObject = {
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    logout: logout, 
    editCartItem: editCartItem,
    cart: userShoppingCart,
    length: userShoppingCart.length,
  }

  React.useEffect(()=>{
    fetchUserShoppingCart()
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


