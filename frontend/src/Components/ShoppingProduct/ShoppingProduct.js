import axios from "axios";
import React from "react";
import shirt from "../../t-shirt-preview.png";

const ADD_TO_CART_URL = "http://localhost:5000/addToCart"

export default function ShoppingProduct({...props}){

    function showColorsDropDown(e){
        console.log("COLORS")
    }

    function redirectToProductView(){
        let productNameWithPlusSigns = props.name.split(" ").join("+")
        window.location=`/p/${productNameWithPlusSigns}/id/${props.id}`
    }

    function generateDropdownOptions(){
        let parent = document.querySelector("#quantitySelector")
        for(let i=1; i<=20; i++){
            let child = document.createElement("option")
            child.value=i
            child.innerText=i
            parent.appendChild(child)
        }
    }

    function submitToServer(e){
        e.preventDefault()
        console.log(e)
        let dataObject = {}
        dataObject["size"]=document.querySelector("#sizeSelector").value
        dataObject["ageCategory"]=document.querySelector("#ageSelector").value
        dataObject["sexCategory"]=document.querySelector("#sexSelector").value
        dataObject["color"]=document.querySelector("#colorSelector").value
        dataObject["amount"]=document.querySelector("#quantitySelector").value

        let dataObjectHeaders = {}
        dataObjectHeaders["productName"] = props.name
        dataObjectHeaders["productId"] = props.id
        dataObjectHeaders["data"] = dataObject
        console.table(dataObjectHeaders)
        axios.post(ADD_TO_CART_URL, dataObjectHeaders, {withCredentials: true})
        .then(response => console.log(response))
        .catch(error => console.error(error))
    }

    React.useEffect(()=>{
        if(props.view === "fullSize")
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
                        <h1>{props.name}</h1>
                        <div>
                            <div>price: ${props.price}</div>
                            <div>maker: {props.manufacturerOrBrand}</div>
                            <div onClick={showColorsDropDown}>colors: {props.colorOptions.length}</div>                    
                        </div>
                    </div>
                        
                </div>
        }

        {
            props.view === "fullSize" &&
            <div className="shoppingProduct--fullSize">
                <h1>{props.name}</h1>
                    <div><img src={shirt}></img></div>
                    <div>{props.id}</div>
                    <div>BRAND: {props.manufacturerOrBrand}</div>
                    <div>TYPE: {props.typeOfClothing}</div>
                    <div>PRICE: {props.price}</div>
                    <div>Polyester: {props.materials.polyester}</div>
                    <div>Cotton: {props.materials.cotton}</div>
                <form action="http://localhost:5000/addToCart" method="POST" id="addToCart">
                    <fieldset>
                        <label htmlFor="sizeSelector">SIZE:</label>
                        <select id="sizeSelector">
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                        <label htmlFor="ageSelector">AGE RANGE:</label> 
                        <select id="ageSelector">
                            <option value="adults">adult</option>
                            <option value="kids">kids</option>
                        </select>
                        <label htmlFor="sexSelector">M/F: </label>
                            <select id="sexSelector">
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select>
                        <div>COLOR OPTIONS: 
                            <label htmlFor="colorSelector"></label>
                            <select id="colorSelector">{props.colorOptions.map((item, index) => <option key={index} value={item}>{item}</option>)}</select></div>
                        <div>Quantity: <select id="quantitySelector"></select></div>       
                        <button onClick={submitToServer}>Add To Cart</button>         
                    </fieldset>
                </form>
                
            </div>
        }
    </>
    )
}