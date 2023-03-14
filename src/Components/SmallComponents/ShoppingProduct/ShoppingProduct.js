import React, { useContext } from "react"
import shirt from "../../../t-shirt-preview.png"
import ColorSelector from "../ColorSelector/ColorSelector"
import { Link } from "react-router-dom"
import { ShoppingCartDispatchContext } from "../../../Contexts/ShoppingContext"
import StarRating from "../StarRatingSelector/StarRating"

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
        const userChoices = {}
        userChoices.size = document.querySelector(".sizeSelector").value
        userChoices.ageCategory = document.querySelector(".ageSelector").value
        userChoices.sexCategory = document.querySelector(".sexSelector").value
        userChoices.color = document.querySelector(".colorSelector").value

        const dataPacket = {}
        dataPacket.productName = props.details.name
        dataPacket.productId = props.details.id
        dataPacket.amount = document.querySelector(".quantitySelector").value
        dataPacket.data = userChoices

        if (props.modal === true) {
            dataPacket.oldData = {
                size: props.userSelectedParameters.size,
                ageCategory: props.userSelectedParameters.ageCategory,
                sexCategory: props.userSelectedParameters.sexCategory,
                color: props.userSelectedParameters.color
            }
            if (oldAndNewDataAreIdentical(dataPacket.oldData, dataPacket.data)) {
                if (props.amount === parseInt(dataPacket.amount)) {
                    return
                }
            }
            dispatch({
                type: "editCartItem",
                properties: dataPacket
            })
            setTimeout(() => { document.querySelector(".cartItem--modal").style.display = "none" }, 1200)
        } else {
            dispatch({
                type: "addToCart",
                properties: dataPacket
            })
        }

        setTimeout(() => { document.querySelector(".fadeModal").style.visibility = "visible" }, 50)
        setTimeout(() => {
            const fadeModal = document.querySelector(".fadeModal")
            if (fadeModal !== null) {
                fadeModal.style.visibility = "hidden"
            }
        }, 1200)
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
                    <div className="shoppingProduct--searchResult--mid" onClick={() => redirectToProductView(props.details.id)}>
                        <Link className={`Link${props.details.id}`} style={{ display: "none" }} to={`/p/${props.details.name.split(" ").join("+")}/id/${props.details.id}`}></Link>
                        <img src={shirt} className="shoppingProduct--searchResult--mid--image" alt={props.name}></img>
                        <div className="shoppingProduct--searchResult--mid--details">
                            <h1>{props.details.name}</h1>
                            <div>
                                <div>price: ${props.details.price}</div>
                                <div>maker: {props.details.manufacturerOrBrand}</div>
                                <div>colors: {props.details.colorOptions.length}</div>
                            </div>
                        </div>
                    </div>
            }

            {
                props.view === "cart" &&
                <div className="productMidView" onClick={checkIfButton}>
                    <div className="shoppingProduct--searchResult--mid" style={{ flex: "1" }} >
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
                <div className="shoppingProduct--fullSize">
                    <div className="fadeModal">
                        <div className="fadeModal--content">SampleText</div>
                    </div>
                    <div className="productHeader">
                        <h1>{props.details.name}</h1>
                        <h3>by {props.details.manufacturerOrBrand}</h3>
                    </div>
                    <div className="productDetails">
                        <div><img className="fullSize-Image" src={shirt} alt={props.name}></img></div>
                        <div>TYPE: {props.details.typeOfClothing}</div>
                        <div>PRICE: {props.details.price}</div>
                        <div>Polyester: {props.details.materials.polyester}</div>
                        <div>Cotton: {props.details.materials.cotton}</div>
                        <StarRating productId={props.details.id} initialAverageRating={props.averageRating}/>
                    </div>
                    <form id="addToCart">
                        { props.modal === true &&
                            <div>
                                <fieldset className="oldData">
                                    <label htmlFor="oldData">Old Selection</label>
                                    <br></br>
                                    <label htmlFor="size">SIZE:</label>
                                    <select className="size" disabled><option>{props.userSelectedParameters.size}</option></select>

                                    <label htmlFor="age">AGE RANGE:</label>
                                    <select className="age" disabled><option>{props.userSelectedParameters.ageCategory}</option></select>

                                    <label htmlFor="sex">M/F:</label>
                                    <select className="sex" disabled><option>{props.userSelectedParameters.sexCategory}</option></select>

                                    <br></br>
                                    <label htmlFor="color">COLOR OPTIONS:</label>
                                    <select className="color" disabled><option>{props.userSelectedParameters.color}</option></select>

                                    <br></br>
                                    <label htmlFor="amount">Quantity:</label>
                                    <select className="amount" disabled><option>{props.amount}</option></select>
                                </fieldset>
                            </div>
                        }
                        <fieldset>
                            <b>New Selection:</b>
                            <br></br>
                            <label htmlFor="sizeSelector">SIZE:</label>
                            <select className="sizeSelector">
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                            <label htmlFor="ageSelector">AGE RANGE:</label>
                            <select className="ageSelector">
                                <option value="adults">adults</option>
                                <option value="kids">kids</option>
                            </select>
                            <br></br>
                            <label htmlFor="sexSelector">M/F: </label>
                            <select className="sexSelector">
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select>
                            <br></br>
                            <br></br>
                            <div>COLOR OPTIONS:
                                <label htmlFor="colorSelector"></label>
                                <select className="colorSelector">{props.details.colorOptions.map((item, index) => <option key={index} value={item}>{item}</option>)}</select>
                            </div>

                            <ColorSelector colorArray={props.details.colorOptions} />

                            <div>Quantity:
                                <select className="quantitySelector">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                </select>
                            </div>
                            <br></br>
                            <br></br>
                            <button className="submitProductButton" onClick={submitToServer}>{ document.querySelector(".cartItem--modal") !== null ? "Submit Changes" : "Add To Cart" }</button>
                        </fieldset>
                    </form>
                </div>
            }
        </>
    )
}
