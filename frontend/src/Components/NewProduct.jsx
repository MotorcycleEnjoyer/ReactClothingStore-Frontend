import React from 'react'
import { Link, useLoaderData, Form, redirect, NavLink, useNavigation } from "react-router-dom"
import { getProduct, addToCart } from "../apiCalls"
import ShoppingProduct from './SmallComponents/ShoppingProduct/ShoppingProduct'

export async function loader({params}){
    const searchResults = await getProduct(params.productId)
    return { searchResults }
}

/*
        let fadeModalContent = document.querySelector(".fadeModal--content")
        fadeModalContent.innerText = response.data
*/

export default function NewNav(){
    const { searchResults } = useLoaderData()
    const product = <ShoppingProduct {...searchResults} addToCart={addToCart} view="fullSize"/>
    
    console.log(searchResults)
    return(
        <>
            <h1>Second Bruh</h1>
            {product ?? <h1>no product</h1>}
        </>
    )
}