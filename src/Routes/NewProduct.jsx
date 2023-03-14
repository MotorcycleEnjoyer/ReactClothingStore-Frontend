import React from "react"
import { useLoaderData } from "react-router-dom"
import { getProduct, addToCart, getInitialRatingsAndReviews } from "../API/apiCalls"
import { LoginContext } from "../Contexts/ShoppingContext"
import ShoppingProduct from "../Components/SmallComponents/ShoppingProduct/ShoppingProduct"
import ReviewBox from "../Components/SmallComponents/ReviewBox/ReviewBox"

export async function loader ({ params }) {
    document.title = `React Clothing Store: ${params.productName}`
    const searchResults = await getProduct(params.productId)
    const { averageRating, reviews } = await getInitialRatingsAndReviews(params.productId)
    return { searchResults, averageRating, reviews }
}

export default function NewProduct () {
    const { searchResults, averageRating, reviews } = useLoaderData()
    const isLoggedIn = React.useContext(LoginContext)
    const product = <ShoppingProduct {...searchResults} averageRating={averageRating} addToCart={addToCart} view="fullSize"/>

    return (
        <>
            {product ?? <h1>no product</h1>}
            {isLoggedIn && <ReviewBox initialReviews={reviews} productId = {searchResults.details.id} />}
        </>
    )
}
