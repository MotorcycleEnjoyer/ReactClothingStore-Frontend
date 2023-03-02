import React from "react"
import ShoppingProduct from "../Components/SmallComponents/ShoppingProduct/ShoppingProduct"
import { getShoppingCart, editCartItem, removeFromCart } from "../API/apiCalls"
import { useLoaderData} from "react-router-dom"
import { ShoppingCartContext, ShoppingCartDispatchContext } from "../Contexts/ShoppingContext"
import { useContext } from "react"

export async function loader(){
    const shoppingCart = await getShoppingCart()
    return { shoppingCart }
}

export default function NewCart(){
    const shoppingCart = useContext(ShoppingCartContext)
    const dispatch = useContext(ShoppingCartDispatchContext)
    // console.log(shoppingCart)

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

    function deleteCartItem(index){
        dispatch({
            type: 'deleteCartItem',
            properties: index
        })
    }

    function changeCartItem(objectHeaders){
        dispatch({
            type: 'editCartItem',
            properties: objectHeaders
        })
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