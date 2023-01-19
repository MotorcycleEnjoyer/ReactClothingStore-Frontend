import React from "react"
import ShoppingProduct from "../ShoppingProduct/ShoppingProduct"

export default function Search({...props}){
    const [searchVal, setSearchVal] = React.useState("")
    const [searchResults, setSearchResults] = React.useState([])
    const [submittedResults, setSubmittedResults] = React.useState([])
    const [blockedCharacters, setBlockedCharacters] = React.useState(new RegExp("[~`!@#$%^&()_={}\\[\\]\\:;,\\.\\/<>\\\\*\\-+\\?]"))

    function checkEnter(e){
        if(e.key === "Enter")
        {
            setSubmittedResults(searchResults)
        }
    }

    function storeSearchValFromClick(value){
        //console.log(`VALUE:   ${value}`)
        changeSearchValueIfProperRegex(value)
        setSubmittedResults(searchResults)
        props.hideModal()
    }

    function fireAfter(){
        props.storeSearchResults(searchResults)
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

    function findItemInDummyDB(phrase){
        let regex
        try{
            regex = new RegExp(phrase, 'gi');
        }catch(e){
            console.error(e)
        }
        
        setSearchResults(
            props.userData.cart.filter(item => {
                return item.name.match(regex)
            })
        )
    }

    React.useEffect(()=>{
        if(searchVal === ""){
            setSearchResults([])
        }else{
            findItemInDummyDB(searchVal)
        }
            
    }, [searchVal])

    React.useEffect(()=>{
        props.storeSearchResults(searchResults)
    },[submittedResults])

    React.useEffect(()=>{
        console.log("SEARCH RESULTS")
        console.log(searchResults)
        console.log("SEARCH RESULTS END")
        // props.storeSearchResults(searchResults)
    },[searchResults])

    const resultsAsHTML = searchResults.map((x, index) => <ShoppingProduct key={index} {...x} storeSearchValFromClick={storeSearchValFromClick} view="searchDropDown"/>)

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