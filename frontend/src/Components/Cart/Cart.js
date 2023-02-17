import React from "react"
import ShoppingProduct from "../ShoppingProduct/ShoppingProduct"
import NavBar from "../NavBar/NavBar"

export default function CartItems({...props}){
    const [cartAsHTML, setCartAsHTML] = React.useState([])
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
        setCartAsHTML(props.cart.map((item, index) => <ShoppingProduct key={index} removeFromCart={props.removeFromCart} index={index} {...item} toggleCartModal={activateCartModal} view={"cart"} />))
    },[props.cart])

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
      let itemToAppend = <ShoppingProduct {...propsFromCartItem} modal={true} editCartItem={props.editCartItem} toggleCartModal={activateCartModal} view="fullSize"/>
      
      setActiveCartItem(itemToAppend)
    }

    React.useEffect(()=>{
      if(activeCartItem !== "" && activeCartItem !== undefined){
        showCartModal()
      }
    },[activeCartItem])
    
    return(
      
      <div>
        <div className="cartItem--modal" style={{display: "none"}} onClick={hideCartModal}>
          <div className="cartItem--modal--content" >
            <h1 className="modalContentHeader">Edit Item</h1>
            {activeCartItem}
          </div>
        </div>
          <div className="cartItems" >
            {cartAsHTML}
          </div>
          <h1>TOTAL: {totalCost.toFixed(2) }</h1>
      </div>
    )
}