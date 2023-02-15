import axios from "axios";
import React from "react";
import shirt from "../../t-shirt-preview.png";

const ADD_TO_CART_URL = "http://localhost:5000/addToCart"
const INVALID_DATA = "POST/addToCart: Could not add to cart. Reason: Invalid data provided."


export default function ShoppingProduct({...props}){
    function redirectToProductView(){
        let productNameWithPlusSigns = props.details.name.split(" ").join("+")
        window.location=`/p/${productNameWithPlusSigns}/id/${props.details.id}`
    }

    function submitToServer(e){
        e.preventDefault()
        let dataObject = {}
        dataObject["size"]=document.querySelector(".sizeSelector").value
        dataObject["ageCategory"]=document.querySelector(".ageSelector").value
        dataObject["sexCategory"]=document.querySelector(".sexSelector").value
        dataObject["color"]=document.querySelector(".colorSelector").value

        let dataObjectHeaders = {}
        dataObjectHeaders["productName"] = props.details.name
        dataObjectHeaders["productId"] = props.details.id
        dataObjectHeaders["amount"] = document.querySelector(".quantitySelector").value
        dataObjectHeaders["data"] = dataObject

        props.addToCart(dataObjectHeaders)
    }
    
    return(
    <>
        {
            props.view === "searchDropDown" &&  
                <div className="shoppingProduct--searchResult--minimum" onClick={()=>props.storeSearchValFromClick(props.name)}>
                    <h3>{props.name}</h3>
                </div>
        }
        
        {
            props.view === "searchResult" &&
                <div className="shoppingProduct--searchResult--mid" onClick={()=> redirectToProductView()}>
                    <img src={shirt} className="shoppingProduct--searchResult--mid--image"></img>
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
            <div style={{display:"flex"}}>
                <div className="shoppingProduct--searchResult--mid" style={{flex: "1"}} onClick={() => props.toggleCartModal(props)}>
                    <img src={shirt} className="shoppingProduct--searchResult--mid--image"></img>
                    <div className="shoppingProduct--searchResult--mid--details">
                        <h1>{props.details.name}</h1>
                        <div>
                            <div>Qty: {props.amount}</div>
                            <div>price: ${props.details.price}</div>
                            <div>maker: {props.details.manufacturerOrBrand}</div>
                            <div>color: {props.userSelectedParameters.color}</div>
                        </div>
                    </div>
                        
                </div>
                <div className="cartButtons">
                    <select className="quantitySelector"></select>
                    <button onClick={() => props.removeFromCart(props.index)}>Remove</button>
                    <div>Cost: ${(props.amount * props.details.price).toFixed(2)}</div>
                </div>       
            </div>
                
        }

        {
            props.view === "fullSize" &&
            <div className="shoppingProduct--fullSize">
                <h1>{props.name}</h1>
                    <div><img src={shirt}></img></div>
                    <div>{props.details.id}</div>
                    <div>BRAND: {props.details.manufacturerOrBrand}</div>
                    <div>TYPE: {props.details.typeOfClothing}</div>
                    <div>PRICE: {props.details.price}</div>
                    <div>Polyester: {props.details.materials.polyester}</div>
                    <div>Cotton: {props.details.materials.cotton}</div>
                <form id="addToCart">
                    <fieldset>
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
                        <label htmlFor="sexSelector">M/F: </label>
                            <select className="sexSelector">
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select>
                        <div>COLOR OPTIONS: 
                            <label htmlFor="colorSelector"></label>
                            <select className="colorSelector">{props.details.colorOptions.map((item, index) => <option key={index} value={item}>{item}</option>)}</select></div>
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
                        <button onClick={submitToServer}>Add To Cart</button>         
                    </fieldset>
                </form>
                
            </div>
        }
    </>
    )
}