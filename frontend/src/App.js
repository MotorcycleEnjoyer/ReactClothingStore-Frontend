import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import axios from 'axios';

import Homepage from './Components/Homepage/Homepage';
import Homepage__PRODUCT from './Components/Homepage/HomepageProduct';
import Homepage__SEARCH from './Components/Homepage/HomepageSearch';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Cart from './Components/Cart/Cart';
import FileNotFound from './Components/FileNotFound/FileNotFound';
import NavBar from './Components/NavBar/NavBar';

import './App.css'
import './Components/SearchBar/Search.css'
import './Components/ShoppingProduct/ShoppingProduct.css';
import './Components/NavBar/NavBar.css'
import './Components/CategoryButton/CategoryButton.css'

export const LoginContext = React.createContext();
export default function App() {


const BASE_URL = "http://localhost:5000"
const LOGOUT_URL = BASE_URL + "/logout"
const LOGIN_URL = BASE_URL + "login"
const DELETION_URL = BASE_URL + "/deleteCartItem"
const ADD_TO_CART_URL = BASE_URL + "/addToCart"
const GET_CART_URL = BASE_URL + "/shoppingCart"
const EDIT_CART_URL = BASE_URL + "/editCartItem"
const REGISTER_URL = BASE_URL + "/register"

function fetchUserShoppingCart(){
    axios.get(GET_CART_URL, {withCredentials: true})
    .then(response => {
        if(response.data.shoppingCart === undefined){
            setUserShoppingCart([])
        }
        else{
            console.log(response.data)
            if(response.data.type === "user"){
              setIsLoggedIn(true)
            }
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
  console.table(dataObjectHeaders)
    axios.post(ADD_TO_CART_URL, dataObjectHeaders, {withCredentials: true})
    .then(response => {
        console.log(response.data)
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

  function register(credentials){
    axios.post(REGISTER_URL, credentials, {withCredentials: true})
    .then(response => {
        if(response.status === 200)
        {
            window.location = "/"
        }
    })
    .catch(error => {
        console.error(error)
    })
  }
  

  const [userShoppingCart, setUserShoppingCart] = React.useState(null)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  const propsObject = {
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    editCartItem: editCartItem,
    cart: userShoppingCart
  }

  React.useEffect(()=>{
    fetchUserShoppingCart()
  },[])

  const [modalStatus, setModalStatus] = React.useState(false)
    function hideModal(){
      document.querySelector(".search--modal").style.display = "none"
      setModalStatus(false)
    }
  
    function showModal(){
      document.querySelector(".search--modal").style.display = "block"
      setModalStatus(true)
    }
  
    function toggleModal(e){
      let target = e.target
      let classType = target.className
      if(classType ==="search--modal--clickListener" || classType==="navBar" || target.type ==="submit"){
        hideModal()
      }
      if(classType === "search--inputBox"){
        showModal()
      }
    }

  return (
    <LoginContext.Provider value = {isLoggedIn}>
      <div className="App" onClick={toggleModal}>
      <BrowserRouter>
        <NavBar 
          length={userShoppingCart?.length || 0}
          logout = {logout}
          modalStatus = {modalStatus}
          hideModal = {hideModal}
          isLoggedIn = {isLoggedIn} 
        />
        
          <Routes>
            {
              userShoppingCart !== null && 
              <>
                <Route path="/s" element={<Homepage__SEARCH cart={userShoppingCart} />}/>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/p/*" element={<Homepage__PRODUCT addToCart={addToCart}/>}/>
                <Route path="/cart" element={<Cart {...propsObject} />}/>
                <Route path="/login" element={<Login loginUrl={LOGIN_URL}/>}/>
                <Route path="/register"  element={<Register register={register} />}/>
                <Route path="/*" element={<FileNotFound />} />              
              </>
            }
            <Route path="/*" element={null} />

          </Routes>
        </BrowserRouter>
      </div>
    </LoginContext.Provider>
      
  );
}


