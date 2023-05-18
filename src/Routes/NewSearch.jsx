import { useLoaderData } from "react-router-dom"
import React from "react"
import { getSearchResults } from "../API/apiCalls"
import ShoppingProduct from "../Components/ShoppingProduct/ShoppingProduct"

export async function loader ({ params, request }) {
    document.title = `React Clothing Store Search: ${params.productName}`
    const searchResults = await getSearchResults(params.productName)
    console.log(request)
    return { searchResults }
}

export default function NewSearch () {
    // pick the sorting function based on url params.
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
        hideFilterModal()
    }

    function showFilterModal () {
        document.querySelector(".filterModal").style.display = "block"
    }

    function hideFilterModal () {
        document.querySelector(".filterModal").style.display = "none"
    }

    function toggleFilterModal (e) {
        if (e.target.className === "filterModal") {
            hideFilterModal()
        }
    }

    return (
        <div className = "productSearchContainer">
            <div onClick={toggleFilterModal} className="filterModal" style={{ display: "none" }}>
                <div className="filterModal--content">
                    <h1 className="searchFilterHeader">Search Filter</h1>
                    <button className="cancelButton" onClick={hideFilterModal}>Cancel</button>
                    <div className="filterButtons">
                        <button onClick={() => { sortArray(pickSortingFunction("alphabetical")) }}>Alphabetical</button>
                        <button onClick={() => { sortArray(pickSortingFunction("reverseAlphabetical")) }}>Reverse Alphabetical</button>
                        <button onClick={() => { sortArray(pickSortingFunction("priceHiLo")) }}>Price High to Low</button>
                        <button onClick={() => { sortArray(pickSortingFunction("priceLoHi")) }}>Price Low to High</button>
                    </div>
                </div>
            </div>
            {products.length > 0 ? <><button onClick={showFilterModal} className="filterButton">Filters</button>{products}</> : <h1>That item is not in our catalogue.</h1>}
        </div>
    )
}
