import React from "react"
import ShoppingProduct from "../ShoppingProduct/ShoppingProduct"
import axios from "axios"

export default function Search({...props}){
    const [searchVal, setSearchVal] = React.useState("")
    const [suggestions, setSuggestions] = React.useState([])
    const [blockedCharacters, setBlockedCharacters] = React.useState(new RegExp("[~`!@#$%^&()_={}\\[\\]\\:;,\\.\\/<>\\\\*\\-+\\?]"))
    const SUGGESTIONS_URL = "http://localhost:5000/suggestions"

    React.useEffect(()=>{
        const searchTermWithPlusSigns = window.location.href.split("s?k=")[1] || false
        if(searchTermWithPlusSigns === undefined || searchTermWithPlusSigns === false){
          return
        }else{
            const searchTermWithSpaces = searchTermWithPlusSigns.split("+").join(" ")
            setSearchVal(searchTermWithSpaces)
        }
    },[])

    function getSuggestions(value){
        const data = {
            searchTerm: value
        }
        axios.post(SUGGESTIONS_URL, data).then(function(response){
            setSuggestions(response.data || [])
        }).catch(error=>{
            if(error.response){
            console.log(error.response.data, error.response.status, error.response.headers)
            }
        })
    }

    function redirectToSearchPage(productName){
        let productNameWithPlusSigns = productName.split(" ").join("+")
        window.location=`/s?k=${productNameWithPlusSigns}`
    }

    function checkEnter(e){
        if(e.key === "Enter")
        {
            if(searchVal==="")
                return
            props.hideModal()
            redirectToSearchPage(searchVal)
            document.activeElement.blur()
        }
    }

    function storeSearchValFromClick(value){
        props.hideModal()
        redirectToSearchPage(value)
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
            getSuggestions(searchVal)
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