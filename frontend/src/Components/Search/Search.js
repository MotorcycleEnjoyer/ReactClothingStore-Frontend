import React from "react"
import ShoppingProduct from "../ShoppingProduct/ShoppingProduct"
import axios from "axios"

export default function Search({...props}){
    const [searchVal, setSearchVal] = React.useState("")
    const [searchResults, setSearchResults] = React.useState([])
    const [submittedResults, setSubmittedResults] = React.useState([])
    const [blockedCharacters, setBlockedCharacters] = React.useState(new RegExp("[~`!@#$%^&()_={}\\[\\]\\:;,\\.\\/<>\\\\*\\-+\\?]"))
    const SUGGESTIONS_URL = "http://localhost:5000/suggestions"
      
        function getSuggestions(value){
        const data = {
            searchTerm: value
        }
        axios.post(SUGGESTIONS_URL, data).then(function(response){
          setSearchResults(response.data || [])
        }).catch(error=>{
          if(error.response){
            console.log(error.response.data, error.response.status, error.response.headers)
          }
        })
      }

    function checkEnter(e){
        if(e.key === "Enter")
        {
            props.hideModal()
            props.storeSearchResults(submittedResults)
        }
    }

    function storeSearchValFromClick(value){
        //console.log(`VALUE:   ${value}`)
        props.hideModal()
        changeSearchValueIfProperRegex(value)
        setSubmittedResults(searchResults)
    }

    function changeSearchValueIfProperRegex(value){
        if(blockedCharacters.test(value)){
            console.log("INVALID REGEX CHARS SPOTTED") 
        }else{
            console.log("IS PROPER")
            setSearchVal(value)
        }
    }

    function handleChange(e){
        changeSearchValueIfProperRegex(e.target.value)
    }

    React.useEffect(()=>{
        if(searchVal === ""){
            setSearchResults([])
        }else{
            getSuggestions(searchVal)
        }
            
    }, [searchVal])

    React.useEffect(()=>{
        // props.storeSearchResults(searchResults)
    },[submittedResults])

    React.useEffect(()=>{
        console.log("SEARCH RESULTS")
        console.log(searchResults)
        console.log("SEARCH RESULTS END")
        /* if(!props.modalStatus){
            props.storeSearchResults(searchResults)
        } */
        // props.storeSearchResults(searchResults)
    },[searchResults])

    const resultsAsHTML = searchResults.map((x, index) => <ShoppingProduct key={index} name={x} storeSearchValFromClick={storeSearchValFromClick} view="searchDropDown"/>) 

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