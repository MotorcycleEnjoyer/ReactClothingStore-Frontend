import React from "react";

export default function ShoppingProduct({...props}){

    console.log(props)
    return(
        <>
            <h1>{props.name}</h1>
            <ul>
                <li>size: {props.size}</li>
                <li>type: {props.typeOfClothing}</li>
                <li>colors: {props.colorOptions.length}</li>
            </ul>
                
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
