import React, { useContext } from "react"
import ShoppingProduct from "../Components/SmallComponents/ShoppingProduct/ShoppingProduct"
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

    function showCartModal (e) {
        const modalStyle = document.querySelector(".cartItem--modal").style
        modalStyle.display = "block"
    }

    function hideCartModal (e) {
        if (e.target.className === "cartItem--modal") {
            const modalStyle = document.querySelector(".cartItem--modal").style
            modalStyle.display = "none"
        }
    }

    function activateCartModal (propsFromCartItem) {
        const itemToAppend = <ShoppingProduct {...propsFromCartItem} modal={true} editCartItem={changeCartItem} toggleCartModal={activateCartModal} view="fullSize"/>
        setActiveCartItem(itemToAppend)
    }

    const cartAsHTML = shoppingCart?.map((item, index) => <ShoppingProduct key={index} removeFromCart={() => deleteCartItem(index)} {...item} toggleCartModal={activateCartModal} view={"cart"} />)

    return (
        <>
            <div className="cartItem--modal" style={{ display: "none" }} onClick={hideCartModal}>
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