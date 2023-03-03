import React, { useLoaderData } from "react-router-dom"
import { getSearchResults } from "../API/apiCalls"
import ShoppingProduct from "../Components/SmallComponents/ShoppingProduct/ShoppingProduct"

export async function loader ({ params }) {
    document.title = `React Clothing Store Search: ${params.productName}`
    const searchResults = await getSearchResults(params.productName)
    return { searchResults }
}

export default function NewSearch () {
    const { searchResults } = useLoaderData()
    const products = searchResults.map((item, index) => <ShoppingProduct key={index} {...item} view="searchResult"/>)
    return (
        <>
            {products}
        </>
    )
}
