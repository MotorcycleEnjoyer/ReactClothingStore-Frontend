import axios from "axios"
import React from "react"
import ShoppingProduct from "../ShoppingProduct/ShoppingProduct"
import NavBar from "../NavBar/NavBar"

export default function CartItems(){
    const LOGOUT_URL = "http://localhost:5000/logout"
    const DELETION_URL = "http://localhost:5000/deleteCartItem"
    const INVALID_CART_DELETION = "POST/deleteCartItem: Cart is not defined."
    const INVALID_DELETION= "POST/deleteCartItem: Invalid Data."
    const [cartAsHTML, setCartAsHTML] = React.useState(<h3>Your cart is empty</h3>)
    const [shoppingCart, setShoppingCart] = React.useState([])
    const [modalStatus, setModalStatus] = React.useState(false)      
    const [activeCartItem, setActiveCartItem] = React.useState("")
    const [totalCost, setTotalCost] = React.useState(0)

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

    React.useEffect(()=>{
      getUserCartItemsFromServer()
    },[])

    React.useEffect(()=>{
        const initialValue = 0;
        const total = shoppingCart.reduce(
          (accumulator, currentItem) => accumulator + (currentItem.amount * currentItem.details.price),
          initialValue
        )
        setTotalCost(total)
    },[shoppingCart])

    function removeFromCart(index){
      console.log(index)
      axios.post(DELETION_URL, {indexOfCartItem: index}, {withCredentials: true})
      .then(response => {
          if(response.data === INVALID_CART_DELETION){
             alert(response.data) 
             return
          }
          if(response.data === INVALID_DELETION){
              alert(response.data)
              return
          }
          console.log(response.data)
          renderCartItems(response.data.shoppingCart)
      })
      .catch(error => console.error(error))
    }

    function renderCartItems(cart){
      if(cart === undefined){
        console.error("CART IS UNDEFINED!!!")
        return
      }
      if(cart.length === 0){
        setShoppingCart(cart)
        setCartAsHTML(<h3>Your cart is empty</h3>)
      }else{
        let cartAsHTML = cart.map((item, index) => <ShoppingProduct key={index} hideSearchModal={hideSearchModal} removeFromCart={removeFromCart} index={index} {...item} toggleCartModal={activateCartModal} view={"cart"} />)
        setShoppingCart(cart)
        setCartAsHTML(cartAsHTML)
      }
      
    }

    function getUserCartItemsFromServer(){
      axios.get("http://localhost:5000/shoppingCart", {withCredentials: true}).then((response) => {
        console.log(response.data.shoppingCart)
        if(response.data.shoppingCart.length > 0){
          renderCartItems(response.data.shoppingCart)
        }
      }).catch(error => {
        console.error(error)
      })
    }

    function hideSearchModal(){
      document.querySelector(".search--modal").style.display = "none"
      setModalStatus(false)
    }
  
    function showSearchModal(){
      document.querySelector(".search--modal").style.display = "block"
      setModalStatus(true)
    }
  
    function toggleModal(e){
      let target = e.target
      let classType = target.className
      if(classType ==="search--modal--clickListener" || classType==="navBar" || target.type ==="submit"){
        hideSearchModal()
      }
      if(classType === "search--inputBox"){
        showSearchModal()
      }
    }

    function showCartModal(e){
      let modalStyle = document.querySelector(".cartItem--modal").style
      modalStyle.display = "block"
    }

    function hideCartModal(e){
      console.log(e.target)
      if(e.target.className === "cartItem--modal"){
        let modalStyle = document.querySelector(".cartItem--modal").style
        modalStyle.display = "none"
      }
    }

    function activateCartModal(propsFromCartItem){    
      let itemToAppend = <ShoppingProduct {...propsFromCartItem} hideSearchModal={hideSearchModal} toggleCartModal={activateCartModal} view="fullSize"/>
      setActiveCartItem(itemToAppend)
    }

    React.useEffect(()=>{
      if(activeCartItem !== "" && activeCartItem !== undefined){
        showCartModal()
      }
    },[activeCartItem])

    React.useEffect(()=>{
      console.log(shoppingCart, "Shopping Cart")
    },[shoppingCart])

    return(
      
      <div onClick={toggleModal}>
        <div className="cartItem--modal" style={{display: "none"}} onClick={hideCartModal}>
          <div className="cartItem--modal--content">
            {activeCartItem}
          </div>
        </div>
          <NavBar modalStatus={modalStatus} userData={{shoppingCart: shoppingCart}} logout={logout} showModal={showSearchModal} hideModal={hideSearchModal}/>
          
          <div className="cartItems">
            {cartAsHTML}
          </div>
          <h1>TOTAL: {totalCost.toFixed(2) }</h1>
      </div>
    )
}