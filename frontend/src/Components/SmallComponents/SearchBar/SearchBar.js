import React from "react"
import ShoppingProduct from "../ShoppingProduct/ShoppingProduct"
import axios from "axios"
import { getSuggestions } from "../../../API/apiCalls"

export default function SearchBar({...props}){
    const [searchVal, setSearchVal] = React.useState("")
    const [suggestions, setSuggestions] = React.useState([])
    const [blockedCharacters, setBlockedCharacters] = React.useState(new RegExp("[~`!@#$%^&()_={}\\[\\]\\:;,\\.\\/<>\\\\*\\-+\\?]"))
    const SUGGESTIONS_URL = "http://localhost:5000/suggestions"

    React.useEffect(()=>{
        const searchQuery = window.location.href.split("s/")[1]
        if(searchQuery !== undefined){
            const withoutPlusSigns = searchQuery.split("+").join(" ")
            setSearchVal(withoutPlusSigns)
        } 
    },[])

    async function fetchNewSuggestionList(value){
        const data = {
            searchTerm: value
        }
        const fetchedSuggestions = await getSuggestions(data)
        setSuggestions(fetchedSuggestions)
    }

    function checkEnter(e){
        if(e.key === "Enter")
        {
            if(searchVal==="")
                return
            
            props.navigateWithoutRefresh(searchVal)
            document.activeElement.blur()
        }
    }

    function storeSearchValFromClick(value){
        setSearchVal(value)
        props.navigateWithoutRefresh(value)
    }

    function changeSearchValueIfProperRegex(value){
        if(blockedCharacters.test(value)){
            console.log("INVALID REGEX CHARS SPOTTED") 
        }else{
            setSearchVal(value)
        }
    }

    function handleChange(e){
        changeSearchValueIfProperRegex(e.target.value)
    }

    React.useEffect(()=>{
        if(searchVal === ""){
            setSuggestions([])
        }else{
            fetchNewSuggestionList(searchVal)
        }
            
    }, [searchVal])

    const resultsAsHTML = suggestions.map((x, index) => <ShoppingProduct key={index} name={x} storeSearchValFromClick={storeSearchValFromClick} view="searchDropDown"/>) 

    return(
        <div className="search">
                <input type="text" value={searchVal} onKeyDown={checkEnter} onChange={handleChange} placeholder="Search" className="search--inputBox"></input>
                <div className="search--modal">
                    <div className="search--modal--searchResultContainer">{resultsAsHTML}</div>
                    <div className="search--modal--clickListener"></div>
                </div>
        </div>

    )
}