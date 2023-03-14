import React, { useContext } from "react"
import ShoppingProduct from "../Components/ShoppingProduct/ShoppingProduct"
import { ShoppingCartContext, ShoppingCartDispatchContext } from "../Contexts/ShoppingContext"

export default function NewCart () {
    const shoppingCart = useContext(ShoppingCartContext)
    const dispatch = useContext(ShoppingCartDispatchContext)

    const iniVal = 0
    const totalCost = shoppingCart
        .reduce(
            (accumulator, currentVal) => accumulator + (currentVal.details.price * currentVal.amount),
            iniVal)

    const [activeCartItem, setActiveCartItem] = React.useState(null)
    React.useEffect(() => {
        if (activeCartItem) {
            showCartModal()
        }
    }, [activeCartItem])

    function deleteCartItem (index) {
        dispatch({
            type: "deleteCartItem",
            properties: index
        })
    }

    function changeCartItem (objectHeaders) {
        dispatch({
            type: "editCartItem",
            properties: objectHeaders
        })
    }

    function clearCart () {
        const yesIWantToDelete = confirm("Are you sure you want to clear your cart?")
        if (yesIWantToDelete) {
            dispatch({
                type: "clearCart"
            })
        }
    }

    function showCartModal (e) {
        const modalStyle = document.querySelector(".cartItem--modal").style
        modalStyle.display = "block"
    }

    function checkClickClassName (e) {
        if (e.target.className === "cartItem--modal") {
            hideCartModal()
        }
    }

    function hideCartModal () {
        const modalStyle = document.querySelector(".cartItem--modal").style
        modalStyle.display = "none"
    }

    function activateCartModal (propsFromCartItem) {
        const itemToAppend = <ShoppingProduct {...propsFromCartItem} modal={true} editCartItem={changeCartItem} toggleCartModal={activateCartModal} view="fullSize"/>
        setActiveCartItem(itemToAppend)
    }

    const cartAsHTML = shoppingCart?.map((item, index) => <ShoppingProduct key={index} removeFromCart={() => deleteCartItem(index)} {...item} toggleCartModal={activateCartModal} view={"cart"} />)

    return (
        <>
            <div className="cartItem--modal" style={{ display: "none" }} onClick={checkClickClassName}>
                <div className="cartItem--modal--content" >
                    <button onClick={hideCartModal} style={{ padding: "20px", marginRight: "0px" }}>Close Edit Menu</button>
                    <h1 className="modalContentHeader">Edit Item</h1>
                    {activeCartItem}
                </div>
            </div>
            <div className="cartItems" >
                {cartAsHTML}
            </div>
            <h1>TOTAL: {totalCost.toFixed(2) }</h1>
            {
                shoppingCart.length > 0 &&
                <button className="clearCartButton" onClick={clearCart}>CLEAR CART</button>}
        </>
    )
}
