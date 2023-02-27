import React from 'react'
import { Link, useLoaderData, Form, redirect, NavLink, useNavigation } from "react-router-dom"
import { getSearchResults } from "../apiCalls"
import ShoppingProduct from './SmallComponents/ShoppingProduct/ShoppingProduct'

export async function loader({ params }){
    const searchResults = await getSearchResults(params.productName)
    return { searchResults }
}

export default function NewSearch(){
    const { searchResults } = useLoaderData()
    const products = searchResults.map((item, index) => <ShoppingProduct key={index} {...item} view="searchResult"/>)
    return(
        <>
            {products}
        </>
    )
}