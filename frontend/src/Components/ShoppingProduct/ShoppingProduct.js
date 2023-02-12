import axios from "axios";
import React from "react";
import shirt from "../../t-shirt-preview.png";

const ADD_TO_CART_URL = "http://localhost:5000/addToCart"
const INVALID_DATA = "POST/addToCart: Could not add to cart. Reason: Invalid data provided."

export default function ShoppingProduct({...props}){
    function showColorsDropDown(e){
        console.log("COLORS")
    }

    function redirectToProductView(){
        let productNameWithPlusSigns = props.details.name.split(" ").join("+")
        window.location=`/p/${productNameWithPlusSigns}/id/${props.details.id}`
    }

    function generateDropdownOptions(){
        let parent = document.querySelectorAll(".quantitySelector")
        for(let i=0; i<=20; i++){
            let child = document.createElement("option")
            child.value=i
            child.innerText=i
            parent.forEach(item => item.appendChild(child))
        }
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
        console.log("DATA:")
        console.log(dataObjectHeaders)
        axios.post(ADD_TO_CART_URL, dataObjectHeaders, {withCredentials: true})
        .then(response => {
            if(response.data === INVALID_DATA){
                alert(INVALID_DATA)
                return
            }
        })
        .catch(error => console.error(error))
    }

    React.useEffect(()=>{
        console.log(props)
        if(props.view === "fullSize" || props.view ==="cart")
        {
            generateDropdownOptions()
        }
    },[])
    
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
                            <div onClick={showColorsDropDown}>colors: {props.details.colorOptions.length}</div>                    
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
                            <div>price: ${props.details.price}</div>
                            <div>maker: {props.details.manufacturerOrBrand}</div>
                            <div onClick={showColorsDropDown}>colors: {props.details.colorOptions.length}</div>                    
                        </div>
                    </div>
                        
                </div>
                <div className="cartButtons">
                    <select className="quantitySelector"></select>
                    <button>Remove</button>
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
                        <div>Quantity: <select className="quantitySelector"></select></div>       
                        <button onClick={submitToServer}>Add To Cart</button>         
                    </fieldset>
                </form>
                
            </div>
        }
    </>
    )
}