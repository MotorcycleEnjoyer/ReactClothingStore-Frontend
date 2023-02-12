import axios from "axios"
import React from "react"
import ShoppingProduct from "../ShoppingProduct/ShoppingProduct"
import NavBar from "../NavBar/NavBar"

export default function CartItems(){
    const LOGOUT_URL = "http://localhost:5000/logout"
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
      if(shoppingCart.length > 0){
        const initialValue = 0;
        const total = shoppingCart.reduce(
          (accumulator, currentItem) => accumulator + (currentItem.amount * currentItem.details.price),
          initialValue
        )
        setTotalCost(total)
      }
    },[shoppingCart])

    function getUserCartItemsFromServer(){
      axios.get("http://localhost:5000/shoppingCart", {withCredentials: true}).then((response) => {
        let shoppingCart = response.data.shoppingCart
        console.log(response.data.shoppingCart)
        if(shoppingCart.length > 0){
          let cartAsHTML = response.data.shoppingCart.map((item, index) => <ShoppingProduct key={index} hideSearchModal={hideSearchModal} index={index} {...item} toggleCartModal={activateCartModal} view={"cart"} />)
          setShoppingCart(shoppingCart)
          setCartAsHTML(cartAsHTML)
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
          <NavBar modalStatus={modalStatus} logout={logout} showModal={showSearchModal} hideModal={hideSearchModal}/>
          
          <div className="cartItems">
            {cartAsHTML}
          </div>
          <h1>TOTAL: {totalCost.toFixed(2) }</h1>
      </div>
    )
}