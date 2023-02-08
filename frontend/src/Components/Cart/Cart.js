import axios from "axios"
import React from "react"
import ShoppingProduct from "../ShoppingProduct/ShoppingProduct"
import NavBar from "../NavBar/NavBar"

export default function CartItems(){
    const LOGOUT_URL = "http://localhost:5000/logout"
    const [cartItems, setCartItems] = React.useState([])
    const [modalStatus, setModalStatus] = React.useState(false)      

    function logout(){
      axios.post(LOGOUT_URL, {dummy: 2}, {withCredentials: true})
      .then(response => {
        alert(response.data)
        if(response.data === "Logged out successfully!")
        {
          window.location = "/"
        }
      })
      .catch(error => console.error(error))
  }

    React.useEffect(()=>{
      getUsercartItemsFromServer()
    },[])

    function getUsercartItemsFromServer(){
      axios.get("http://localhost:5000/shoppingCart", {withCredentials: true}).then((response) => {
        let itemsInCart = response.data.shoppingCart.map((item, index) => <ShoppingProduct key={index} {...item} view={"cart"} />)
        setCartItems(itemsInCart)
      }).catch(error => {
        console.error(error)
      })
    }

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

    return(
      
      <div onClick={toggleModal}>
          <NavBar modalStatus={modalStatus} logout={logout} cartItems={cartItems} showModal={showModal} hideModal={hideModal}/>
          <div className="cartItems">
            {cartItems}
          </div>
      </div>
    )
}