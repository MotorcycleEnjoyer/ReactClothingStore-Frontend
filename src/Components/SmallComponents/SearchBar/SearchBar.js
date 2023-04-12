import React, { useCallback } from "react"
import debounce from "lodash.debounce"
import ShoppingProduct from "../../ShoppingProduct/ShoppingProduct"
import { getSuggestions } from "../../../API/apiCalls"

export default function SearchBar ({ ...props }) {
    const [searchVal, setSearchVal] = React.useState("")
    const [suggestions, setSuggestions] = React.useState([])

    React.useEffect(() => {
        const searchQuery = window.location.href.split("s/")[1]
        if (searchQuery !== undefined) {
            const withoutPlusSigns = searchQuery.split("+").join(" ")
            setSearchVal(withoutPlusSigns)
        }
    }, [])

    async function fetchNewSuggestionList (value) {
        const data = {
            searchTerm: value
        }
        const fetchedSuggestions = await getSuggestions(data)
        setSuggestions(fetchedSuggestions)
    }

    function checkEnter (e) {
        if (e.key === "Enter") {
            props.navigateWithoutRefresh(e.target.value)
            document.activeElement.blur()
        }
    }

    function storeSearchValFromClick (value) {
        setSearchVal(value)
        props.navigateWithoutRefresh(value)
    }

    function changeSearchValueIfProperRegex (value) {
        setSearchVal(value)
    }

    function handleChange (e) {
        changeSearchValueIfProperRegex(e.target.value)
    }

    const debouncedChangeHandler = useCallback(debounce(handleChange, 400), [])

    React.useEffect(() => {
        if (searchVal === "") {
            setSuggestions([])
        } else {
            fetchNewSuggestionList(searchVal)
        }
    }, [searchVal])

    const resultsAsHTML = suggestions?.map((x, index) => <ShoppingProduct key={index} name={x} storeSearchValFromClick={storeSearchValFromClick} view="searchDropDown"/>)

    return (
        <div className="search">
            <input type="text" onKeyDown={checkEnter} onChange={debouncedChangeHandler} placeholder="Search" className="search--inputBox" maxLength="50"></input>
            <div className="search--modal">
                <div className="search--modal--searchResultContainer">{resultsAsHTML}</div>
                <div className="search--modal--clickListener"></div>
            </div>
        </div>

    )
}
