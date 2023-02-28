import React from "react"
import ShoppingProduct from "../Components/SmallComponents/ShoppingProduct/ShoppingProduct"
import { getShoppingCart, editCartItem, removeFromCart } from "../API/apiCalls"
import { useLoaderData } from "react-router-dom"

export async function loader(){
    const shoppingCart = await getShoppingCart()
    return { shoppingCart }
}

export default function NewCart(){
    const [shoppingCart, setShoppingCart] = React.useState(useLoaderData().shoppingCart)
    let iniVal = 0;
    const totalCost = shoppingCart
        .reduce((accumulator, currentVal) =>
            accumulator = accumulator + (currentVal.details.price * currentVal.amount),
            iniVal)

    const [activeCartItem, setActiveCartItem] = React.useState(null)
    React.useEffect(()=>{
        if(activeCartItem){
          showCartModal()
        }
      },[activeCartItem])

    async function deleteCartItem(index){
        const newCart = await removeFromCart(index)
        if(newCart !== null && newCart !== undefined){
            setShoppingCart(newCart)
        }
    }

    async function changeCartItem(objectHeaders){
        console.log(objectHeaders)
        const newCart = await editCartItem(objectHeaders).shoppingCart
        if(newCart !== null && newCart !== undefined){
            setShoppingCart(newCart)
        } 
    }

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
        let itemToAppend = <ShoppingProduct {...propsFromCartItem} modal={true} editCartItem={changeCartItem} toggleCartModal={activateCartModal} view="fullSize"/>

        setActiveCartItem(itemToAppend)
    }

    const cartAsHTML = shoppingCart?.map((item, index) => <ShoppingProduct key={index} removeFromCart={() => deleteCartItem(index)} {...item} toggleCartModal={activateCartModal} view={"cart"} />)

    return (
    <>
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
    </>
    )
}