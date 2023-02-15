import React from "react"
import ShoppingProduct from "../ShoppingProduct/ShoppingProduct"
import NavBar from "../NavBar/NavBar"

export default function CartItems({...props}){
    const [cartAsHTML, setCartAsHTML] = React.useState([])
    const [modalStatus, setModalStatus] = React.useState(false)      
    const [activeCartItem, setActiveCartItem] = React.useState("")
    const [totalCost, setTotalCost] = React.useState(0)

    React.useEffect(()=>{
      console.log(props)
        const initialValue = 0;
        const total = props.cart.reduce(
          (accumulator, currentItem) => accumulator + (currentItem.amount * currentItem.details.price),
          initialValue
        )
        setTotalCost(total)
        setCartAsHTML(props.cart.map((item, index) => <ShoppingProduct key={index} hideSearchModal={hideSearchModal} removeFromCart={props.removeFromCart} index={index} {...item} toggleCartModal={activateCartModal} view={"cart"} />))
    },[props.cart])

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
      let itemToAppend = <ShoppingProduct {...propsFromCartItem} addToCart={props.addToCart} hideSearchModal={hideSearchModal} toggleCartModal={activateCartModal} view="fullSize"/>
      setActiveCartItem(itemToAppend)
    }

    React.useEffect(()=>{
      if(activeCartItem !== "" && activeCartItem !== undefined){
        showCartModal()
      }
    },[activeCartItem])

    return(
      
      <div onClick={toggleModal}>
        <div className="cartItem--modal" style={{display: "none"}} onClick={hideCartModal}>
          <div className="cartItem--modal--content">
            {activeCartItem}
          </div>
        </div>
          <NavBar modalStatus={modalStatus} length={props.length} logout={props.logout} showModal={showSearchModal} hideModal={hideSearchModal}/>
          
          <div className="cartItems">
            {cartAsHTML}
          </div>
          <h1>TOTAL: {totalCost.toFixed(2) }</h1>
      </div>
    )
}