import React from "react"
import ShoppingProduct from "../../SmallComponents/ShoppingProduct/ShoppingProduct"

export default function CartItems({...props}){
    const [cartAsHTML, setCartAsHTML] = React.useState(null)
    const [activeCartItem, setActiveCartItem] = React.useState(null)
    const [totalCost, setTotalCost] = React.useState(0)

    React.useEffect(()=>{
      if(props.cart === null || props.cart === undefined){
        return
      }
      const initialValue = 0;
      const total = props.cart.reduce(
        (accumulator, currentItem) => accumulator + (currentItem.amount * currentItem.details.price),
        initialValue
      )
      setTotalCost(total)
      setCartAsHTML(props.cart.map((item, index) => <ShoppingProduct key={index} removeFromCart={() => props.removeFromCart(index)} {...item} toggleCartModal={activateCartModal} view={"cart"} />))
    },[props.cart])

    function showCartModal(e){
      let modalStyle = document.querySelector(".cartItem--modal").style
      modalStyle.display = "block"
    }

    function hideCartModal(e){
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
      if(activeCartItem){
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