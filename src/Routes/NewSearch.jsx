import { useLoaderData } from "react-router-dom"
import React from "react"
import { getSearchResults } from "../API/apiCalls"
import ShoppingProduct from "../Components/ShoppingProduct/ShoppingProduct"

export async function loader ({ params }) {
    document.title = `React Clothing Store Search: ${params.productName}`
    const searchResults = await getSearchResults(params.productName)
    return { searchResults }
}

export default function NewSearch () {
    const { searchResults } = useLoaderData()
    const [resultsState, setResultsState] = React.useState(searchResults)
    const products = resultsState.map((item, index) => <ShoppingProduct key={index} {...item} view="searchResult"/>)

    function pickSortingFunction (desiredSortMethod) {
        switch (desiredSortMethod) {
        case "alphabetical": {
            return function (a, b) { return a.details.name.toLowerCase() > b.details.name.toLowerCase() }
        }
        case "reverseAlphabetical": {
            return function (a, b) { return b.details.name.toLowerCase() > a.details.name.toLowerCase() }
        }
        case "priceHiLo": {
            return function (a, b) { return b.details.price - a.details.price }
        }
        case "priceLoHi": {
            return function (a, b) { return a.details.price - b.details.price }
        }
        }
    }

    function sortArray (sortingFunction) {
        const sortedArr = [...resultsState].sort(sortingFunction)
        setResultsState(sortedArr)
    }

    return (
        <div className = "productSearchContainer">
            <div className="filterContainer">
                <button onClick={() => { sortArray(pickSortingFunction("alphabetical")) }}>Alphabetical</button>
                <button onClick={() => { sortArray(pickSortingFunction("reverseAlphabetical")) }}>Reverse Alphabetical</button>
                <button onClick={() => { sortArray(pickSortingFunction("priceHiLo")) }}>Price High to Low</button>
                <button onClick={() => { sortArray(pickSortingFunction("priceLoHi")) }}>Price Low to High</button>
            </div>
            {products}
        </div>
    )
}
