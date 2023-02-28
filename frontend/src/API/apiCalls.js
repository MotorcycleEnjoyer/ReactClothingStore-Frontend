import axios from "axios"
const BASE_URL = "http://localhost:5000"
const GET_CART_URL = BASE_URL + "/shoppingCart"
const LOGOUT_URL = BASE_URL + "/logout"
const SEARCH_URL = BASE_URL + "/s?k="
const ADD_TO_CART_URL = BASE_URL + "/addToCart"
const REGISTER_URL = BASE_URL + "/register"
const DELETION_URL = BASE_URL + "/deleteCartItem"
const SUGGESTIONS_URL = BASE_URL + "/suggestions"

export async function getShoppingCart(){
        return axios.get(GET_CART_URL, {withCredentials: true})
          .then(response => {
            if(response.data.shoppingCart === undefined){
                console.error("undefined")
                return
            }
            else{
                return response.data.shoppingCart
            }
          }).catch(error => console.error(error))
}

export async function getSearchResults(query){
    return axios.get(SEARCH_URL + query, {withCredentials: true})
        .then(response => {
            return response.data
        })
        .catch(error => console.error(error))
}

export async function getProduct(id){
    return axios.get(`${BASE_URL}/p//id/${id}`, {withCredentials: true})
        .then(response => {
            return response.data
        })
        .catch(error => console.error(error))
}

export async function addToCart(dataObjectHeaders){
    axios.post(ADD_TO_CART_URL, dataObjectHeaders, {withCredentials: true})
    .then(response => {
        console.log(response.data)
    })
    .catch(error => console.error(error))
  }

export async function logout(){
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

export async function register(credentials){
    axios.post(REGISTER_URL, credentials, {withCredentials: true})
    .then(response => {
        if(response.status === 200)
        {
            window.location = "/"
        }
    })
    .catch(error => console.error(error))
  }

export async function removeFromCart(index){
    console.log(index)
    return axios.post(DELETION_URL, {indexOfCartItem: index}, {withCredentials: true})
    .then(response => {
        return response.data.shoppingCart
    })
    .catch(error => console.error(error))
  }

  export async function getSuggestions(data){
    return axios.post(SUGGESTIONS_URL, data).then(function(response){
      return response.data || []
    }).catch(error=>{
      if(error.response){
      console.log(error.response.data, error.response.status, error.response.headers)
      }
  })
  }