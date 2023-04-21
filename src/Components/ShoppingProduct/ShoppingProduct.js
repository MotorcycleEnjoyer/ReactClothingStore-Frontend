import React, { useContext } from "react"
import shirt from "../../t-shirt-preview.png"
import SearchResult from "./variations/searchResult"
import { ShoppingCartDispatchContext } from "../../Contexts/ShoppingContext"
import FullSize from "./variations/fullSize"

export default function ShoppingProduct ({ ...props }) {
    const dispatch = useContext(ShoppingCartDispatchContext)

    function redirectToProductView (id) {
        document.querySelector(`.Link${id}`).click()
    }

    function oldAndNewDataAreIdentical (first, second) {
        const keys = Object.keys(first)
        let allEqual = true
        keys.forEach(key => {
            if (first[key] !== second[key]) {
                allEqual = false
            }
        })
        return allEqual
    }

    function checkIfButton (e) {
        if (e.target.nodeName !== "BUTTON") {
            props.toggleCartModal(props)
        }
    }

    function submitToServer (e) {
        e.preventDefault()
        const rawFormData = new FormData(e.target)
        const { size, ageCategory, sexCategory, color, quantity } = Object.fromEntries(rawFormData)
        const userChoices = { size, ageCategory, sexCategory, color }

        const dataPacket = {}
        dataPacket.productName = props.details.name
        dataPacket.productId = props.details.id
        dataPacket.amount = quantity
        dataPacket.newUserChoices = userChoices

        if (props.modal) {
            dataPacket.oldUserChoices = {
                size: props.userSelectedParameters.size,
                ageCategory: props.userSelectedParameters.ageCategory,
                sexCategory: props.userSelectedParameters.sexCategory,
                color: props.userSelectedParameters.color
            }
            if (oldAndNewDataAreIdentical(dataPacket.oldUserChoices, dataPacket.newUserChoices)) {
                if (props.amount === parseInt(dataPacket.amount)) {
                    return
                }
            }
            dataPacket.index = props.index
            dispatch({
                type: "editCartItem",
                properties: dataPacket
            })
            props.hideCartModal()
        } else {
            dispatch({
                type: "addToCart",
                properties: dataPacket
            })
            const selectedColorbox = document.querySelector(".colorInput--active")
            selectedColorbox?.classList.remove("colorInput--active")
            e.target.reset()
        }
    }

    return (
        <>
            {
                props.view === "searchDropDown" &&
                    <div className="shoppingProduct--searchResult--minimum" onClick={() => props.storeSearchValFromClick(props.name)}>
                        <h3>{props.name}</h3>
                    </div>
            }

            {
                props.view === "searchResult" &&
                    <SearchResult
                        redirectToProductView = {redirectToProductView}
                        details = {props.details}
                        name = {props.name}
                    />
            }

            {
                props.view === "cart" &&
                <div className="productMidView">
                    <div className="shoppingProduct--searchResult--mid" style={{ flex: "1" }} onClick={checkIfButton} >
                        <img src={shirt} className="shoppingProduct--searchResult--mid--image" alt={props.name}></img>
                        <div className="shoppingProduct--searchResult--mid--details">
                            <h1>{props.details.name}</h1>
                            <div>
                                <div>Qty: {props.amount}</div>
                                <div>price: ${props.details.price}</div>
                                <div>maker: {props.details.manufacturerOrBrand}</div>
                                <div>color: {props.userSelectedParameters.color}</div>
                            </div>
                        </div>
                        <div className="cartButtons">
                            <button className="editCartItemButton" onClick={() => props.toggleCartModal(props)}>Edit</button>
                            <button className="removeFromCartButton" onClick={() => props.removeFromCart(props.index)}>Remove</button>
                            <div className="cartItemCost">Cost: ${(props.amount * props.details.price).toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            }

            {
                props.view === "fullSize" &&
                <FullSize
                    name = {props.name}
                    amount = {props.amount}
                    details = {props.details}
                    userSelectedParameters = {props.userSelectedParameters}
                    modal = {props.modal}
                    averageRating = {props.averageRating}
                    submitToServer = { submitToServer }
                />
            }
        </>
    )
}
