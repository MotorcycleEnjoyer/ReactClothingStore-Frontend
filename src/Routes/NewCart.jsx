import React, { useContext } from "react"
import ShoppingProduct from "../Components/ShoppingProduct/ShoppingProduct"
import { ShoppingCartContext, ShoppingCartDispatchContext } from "../Contexts/ShoppingContext"
import { Link } from "react-router-dom"
import { checkoutWithStripe } from "../API/apiCalls"

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
        const modalStyle = document.querySelector(".cartItem--modal")
        modalStyle.style.display = "none"
        setActiveCartItem(() => null)
    }

    function activateCartModal (propsFromCartItem) {
        const itemToAppend = <ShoppingProduct {...propsFromCartItem} modal={true} editCartItem={changeCartItem} hideCartModal={hideCartModal} toggleCartModal={activateCartModal} view="fullSize"/>
        setActiveCartItem(itemToAppend)
    }

    /* function handleFormSubmit () {
        dispatch({
            type: "submitOrder",
            properties: shoppingCart
        })
    } */

    const cartAsHTML = shoppingCart?.map((item, index) => <ShoppingProduct key={index} index={index} removeFromCart={() => deleteCartItem(index)} {...item} toggleCartModal={activateCartModal} view={"cart"} />)

    return (
        <>
            { shoppingCart?.length > 0 &&
            <>
                <div className="cartItem--modal" style={{ display: "none" }} onClick={checkClickClassName}>
                    <div className="cartItem--modal--content" >
                        <button onClick={hideCartModal} style={{ padding: "20px", marginRight: "0px" }}>Close Edit Menu</button>
                        <h1 className="modalContentHeader">Edit Item</h1>
                        {activeCartItem}
                    </div>
                </div>
                <div>
                    <h1 style={{ color: "black" }}>TOTAL: {totalCost.toFixed(2) }<span></span></h1>
                    {/* <button style={{ padding: "1rem" }} onClick={handleFormSubmit}>Checkout</button> */}
                    <button style={{ padding: "1rem" }} onClick={() => { checkoutWithStripe(shoppingCart) }}>Checkout</button>
                </div>
                <div className="cartItems" >
                    {cartAsHTML}
                </div>
                <button className="clearCartButton" onClick={clearCart}>CLEAR CART</button>
            </>
            }
            { shoppingCart?.length === 0 &&
            <>
                <h1 style={{ color: "white" }}>Your shopping cart is empty</h1>
                <Link to="/"><button style={{ padding: "1rem" }}>Back to home</button></Link>
            </>
            }
        </>
    )
}
