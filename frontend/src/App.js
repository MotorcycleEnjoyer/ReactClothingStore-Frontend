import React from 'react';
import { BrowserRouter, Route, Routes, createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import axios from 'axios';

import Homepage from './Components/MainRouteComponent/Homepage/Homepage';
import Homepage__PRODUCT from './Components/MainRouteComponent/ProductView/HomepageProduct';
import Homepage__SEARCH from './Components/MainRouteComponent/ProductSearch/HomepageSearch';
import Login from './Components/MainRouteComponent/Login/Login';
import Register from './Components/MainRouteComponent/Register/Register';
import Cart from './Components/MainRouteComponent/CartView/Cart';
import FileNotFound from './Components/MainRouteComponent/FileNotFound/FileNotFound';
import NavBar from './Components/SmallComponents/NavBar/NavBar';

import './App.css'
import './Components/SmallComponents/SearchBar/Search.css'
import './Components/SmallComponents/ShoppingProduct/ShoppingProduct.css';
import './Components/SmallComponents/NavBar/NavBar.css'
import './Components/SmallComponents/CategoryButton/CategoryButton.css'
import './Components/SmallComponents/ColorSelector/ColorSelector.css'

import NewNav, { loader as NavLoader } from "./Components/NewNav"
import NewSearch, { loader as SearchLoader } from "./Components/NewSearch"
import NewProduct, { loader as NewProductLoader } from "./Components/NewProduct"

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


const BASE_URL = "http://localhost:5000"
const LOGOUT_URL = BASE_URL + "/logout"
const LOGIN_URL = BASE_URL + "login"
const DELETION_URL = BASE_URL + "/deleteCartItem"
const ADD_TO_CART_URL = BASE_URL + "/addToCart"
const GET_CART_URL = BASE_URL + "/shoppingCart"
const EDIT_CART_URL = BASE_URL + "/editCartItem"
const REGISTER_URL = BASE_URL + "/register"

/* function fetchUserShoppingCart(){
  let ignore = false
  setUserShoppingCart(null)
    axios.get(GET_CART_URL, {withCredentials: true})
    .then(response => {
      if(!ignore){
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
      }
    }).catch(error => console.error(error))
    return () => {
      ignore = true
    }
  }



function removeFromCart(index){
    console.log(index)
    axios.post(DELETION_URL, {indexOfCartItem: index}, {withCredentials: true})
    .then(response => {
        setUserShoppingCart(response.data.shoppingCart)
    })
    .catch(error => console.error(error))
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
    } */

  return (
/*     <LoginContext.Provider value = {isLoggedIn}>
      <div className="App" onClick={toggleModal}>
      <BrowserRouter>
        <NavBar 
          length={userShoppingCart?.length || 0}
          logout = {logout}
          modalStatus = {modalStatus}
          hideModal = {hideModal}
        />
        {
          userShoppingCart !== null &&
          <Routes>
              <Route path="/s" element={<Homepage__SEARCH cart={userShoppingCart} />}/>
              <Route path="/" element={<Homepage/>}/>
              <Route path="/p/*" element={<Homepage__PRODUCT addToCart={addToCart}/>}/>
              <Route path="/cart" element={<Cart {...propsObject} />}/>
              <Route path="/login" element={<Login loginUrl={LOGIN_URL}/>}/>
              <Route path="/register"  element={<Register register={register} />}/>
              <Route path="/*" element={<FileNotFound />} />              
          </Routes>
        } 
        </BrowserRouter>
      </div>
    </LoginContext.Provider> */
    <>
      <RouterProvider router={router}  />
    </>
      
  );
}


