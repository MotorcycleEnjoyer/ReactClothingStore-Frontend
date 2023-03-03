import React from "react"
import { useLoaderData } from "react-router-dom"
import { getProduct, addToCart } from "../API/apiCalls"
import ShoppingProduct from "../Components/SmallComponents/ShoppingProduct/ShoppingProduct"

export async function loader ({ params }) {
    document.title = `React Clothing Store: ${params.productName}`
    const searchResults = await getProduct(params.productId)
    return { searchResults }
}

export default function NewProduct () {
    const { searchResults } = useLoaderData()
    const product = <ShoppingProduct {...searchResults} addToCart={addToCart} view="fullSize"/>

    return (
        <>
            {product ?? <h1>no product</h1>}
        </>
    )
}
