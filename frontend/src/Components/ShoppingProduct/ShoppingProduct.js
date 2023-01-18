import React from "react";
import shirt from "../../t-shirt-preview.png";

export default function ShoppingProduct({...props}){


    function showColorsDropDown(e){
        console.log("COLORS")
    }
    console.log(props)
    return(
        // TWO VIEWS:
    <>
        {
            props.view === "searchDropDown" &&  
                <div className="shoppingProduct--searchResult--minimum">
                    <h3>{props.name}</h3>
                </div>
        }
        
        {
            props.view !== "searchDropDown" &&
                <div className="shoppingProduct--searchResult--maximum">
                    <img src={shirt} className="shoppingProduct--searchResult--maximum--image"></img>
                    <div className="shoppingProduct--searchResult--maximum--details">
                        <h1>{props.name}</h1>
                        <div>
                            <div>price: ${props.price}</div>
                            <div>maker: {props.manufacturerOrBrand}</div>
                            <div onClick={showColorsDropDown}>colors: {props.colorOptions.length}</div>
                        </div>
                    </div>
                        
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
