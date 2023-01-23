import React from "react";
import shirt from "../../t-shirt-preview.png";

export default function ShoppingProduct({...props}){

    function showColorsDropDown(e){
        console.log("COLORS")
    }
    
    return(
        // TWO VIEWS:
        
    <>
        {
            props.view === "searchDropDown" &&  
                <div className="shoppingProduct--searchResult--minimum" onClick={()=>props.storeSearchValFromClick(props.name)}>
                    <h3>{props.name}</h3>
                </div>
        }
        
        {
            props.view === "searchResult" &&
                <div className="shoppingProduct--searchResult--mid" onClick={()=> props.selectProduct(props.id)}>
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
                <div>SIZE: {props.size}</div>
                <div>AGE RANGE: {props.ageCategory}</div>
                <div>M/F: {props.sexCategory}</div>
                <div>TYPE: {props.typeOfClothing}</div>
                <div>COLOR OPTIONS: <select>{props.colorOptions.map((item, index) => <option key={index} value={item}>{item}</option>)}</select></div>
                <div>PRICE: {props.price}</div>
                <div>Polyester: {props.materials.polyester}</div>
                <div>Cotton: {props.materials.cotton}</div>
                <div>AMOUNT SELECTED: {props.amount}</div>
            </div>
        }
    </>
    )
}

    /*
    {
            id: 1,
            name: "one",
            manufacturerOrBrand: "T-Shirt-CO",
            size: 5,
            ageCategory: "5-10",
            sexCategory: "M",
            typeOfClothing: "T-Shirt",
            colorOptions: ["red", "green", "orange", "pink"],
            imagePreviewURL: "a",
            variationIsInStock: [{color: "red", amountInStock: 10}, {color: "green", amountInStock: 3}, {color: "orange", amountInStock: 0}, {color:"pink", amountInStock:2}],
            weight: {grams: 50},
            dimensions: "LxWxH",
            price: 5.99,
            materials: {polyester: "50%", cotton: "50%"},
            amount: 1,
            totalCost: 5.99,
        }
    */
