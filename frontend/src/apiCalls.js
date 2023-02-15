import axios from 'axios';

const BASE_URL = "http://localhost:5000"
const LOGOUT_URL = BASE_URL + "/logout"
const LOGIN_URL = BASE_URL + "login"
const DELETION_URL = BASE_URL + "/deleteCartItem"
const ADD_TO_CART_URL = BASE_URL + "/addToCart"
const GET_CART_URL = BASE_URL + "/shoppingCart"

function fetchUserShoppingCart(){
    const storageVar = []
    axios.get(GET_CART_URL, {withCredentials: true})
    .then((response) => {
        if(response.data.shoppingCart === undefined){
        }
        else{
            storageVar.push(response.data.shoppingCart)
        }
    }).catch(error => console.error(error))
    // console.log(storageVar.length)
    console.table(storageVar[0])
    return storageVar
  }

function logout(){
    axios.post(LOGOUT_URL, {dummy: 2}, {withCredentials: true})
    .then((response) => {
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
    let storageVar = ""
    axios.post(DELETION_URL, {indexOfCartItem: index}, {withCredentials: true})
    .then((response) => {
        storageVar = response.data.shoppingCart
    })
    .catch(error => console.error(error))
    return storageVar
  }

function addToCart(dataObjectHeaders){
    let storageVar = ""
    axios.post(ADD_TO_CART_URL, dataObjectHeaders, {withCredentials: true})
    .then((response) => {
        alert(response.data)
        storageVar = fetchUserShoppingCart()
    })
    .catch(error => console.error(error))
    return storageVar
  }

export default { fetchUserShoppingCart, logout, removeFromCart, addToCart }
