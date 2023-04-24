import React from "react"
import { useLoaderData } from "react-router-dom"
import { getProduct, addToCart, getInitialRatingsAndReviews, addProductReview } from "../API/apiCalls"
import { LoginContext } from "../Contexts/ShoppingContext"
import ShoppingProduct from "../Components/ShoppingProduct/ShoppingProduct"
import ReviewBox from "../Components/SmallComponents/ReviewBox/ReviewBox"

export async function loader ({ params }) {
    document.title = `React Clothing Store: ${params.productName}`
    const searchResults = await getProduct(params.productId)
    const { averageRating, reviews } = await getInitialRatingsAndReviews(params.productId)
    return { searchResults, averageRating, reviews }
}

export default function NewProduct () {
    const { searchResults, averageRating, reviews } = useLoaderData()
    const [override, setOverride] = React.useState(null)
    const isLoggedIn = React.useContext(LoginContext)
    const product = <ShoppingProduct {...searchResults} averageRating={override?.averageRating || averageRating} addToCart={addToCart} view="fullSize"/>

    async function getNewData (payload) {
        const bigData = await addProductReview(searchResults.details.id, payload)
        const newPayload = { reviews: bigData.reviews, averageRating: bigData.averageRating }
        setOverride(() => newPayload)
    }

    return (
        <>
            {product ?? <h1>no product</h1>}
            <ReviewBox initialReviews={override?.reviews || reviews} getNewData={getNewData} loggedIn={isLoggedIn} productId = {searchResults.details.id} />
        </>
    )
}
