import React from "react";
import shirt from "../../../t-shirt-preview.png";
import ColorSelector from "../ColorSelector/ColorSelector";
import { redirect, Link } from "react-router-dom";

export default function ShoppingProduct({...props}){
    function redirectToProductView(id){
        document.querySelector(`.Link${id}`).click()
    }

    function oldAndNewDataAreIdentical(first, second){
        let keys = Object.keys(first)
        let allEqual = true
        keys.forEach(key=>{
                if(first[key] !== second[key])
                    allEqual = false
        })
        return allEqual
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

        if(props.modal!== undefined && props.modal === true){
            dataObjectHeaders["oldData"] = { 
                size: props.userSelectedParameters.size,
                ageCategory: props.userSelectedParameters.ageCategory,
                sexCategory: props.userSelectedParameters.sexCategory,
                color: props.userSelectedParameters.color
            }
            if(oldAndNewDataAreIdentical(dataObjectHeaders["oldData"], dataObjectHeaders["data"])){
                if(props.amount === dataObject["amount"])
                    return
            }
            props.editCartItem(dataObjectHeaders)
            setTimeout(() => {document.querySelector(".cartItem--modal").style.display = "none";}, 2005)
        }else{
            props.addToCart(dataObjectHeaders)
        }
        
        setTimeout(() => {document.querySelector(".fadeModal").style.visibility = "visible"}, 50)
        setTimeout(() => {document.querySelector(".fadeModal").style.visibility = "hidden"}, 2000)
        
    }

    const [colorSelected, setColorSelected] = React.useState("")
    
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
                <div className="shoppingProduct--searchResult--mid" onClick={()=> redirectToProductView(props.details.id)}>
                    <Link className={`Link${props.details.id}`} style={{display: "none"}} to={`/p/${props.details.name.split(" ").join("+")}/id/${props.details.id}`}></Link>
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
                    <button className="editCartItemButton" onClick={() => props.toggleCartModal(props)}>Edit</button>
                    <button className="removeFromCartButton" onClick={() => props.removeFromCart(props.index)}>Remove</button>
                    <div className="cartItemCost">Cost: ${(props.amount * props.details.price).toFixed(2)}</div>
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
                    <div><img src={shirt}></img></div>
                    <div>TYPE: {props.details.typeOfClothing}</div>
                    <div>PRICE: {props.details.price}</div>
                    <div>Polyester: {props.details.materials.polyester}</div>
                    <div>Cotton: {props.details.materials.cotton}</div>
                </div>
                    
                <form id="addToCart">
                    {   props.modal === true &&
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
                        <label htmlFor="sexSelector">M/F: </label>
                            <select className="sexSelector">
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select>
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
                        <button onClick={submitToServer}>Add To Cart</button>         
                    </fieldset>
                    
                </form>
                
            </div>
        }
    </>
    )
}