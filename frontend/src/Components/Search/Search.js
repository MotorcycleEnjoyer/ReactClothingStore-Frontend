import React from "react"
import {userData} from "../../DummyProductDB"
import ShoppingProduct from "../ShoppingProduct/ShoppingProduct"

export default function Search(){
    const [searchVal, setSearchVal] = React.useState("")
    const [searchResults, setSearchResults] = React.useState([])
    const [blockedCharacters, setBlockedCharacters] = React.useState(new RegExp("[~`!@#$%^&()_={}\\[\\]\\:;,\\.\\/<>\\\\*\\-+\\?]"))
    function handleChange(e){
        console.log(e.target.value)
        if(blockedCharacters.test(e.target.value)){
            console.log("INVALID REGEX CHARS SPOTTED") 
        }else{
            console.log("IS PROPER")
            setSearchVal(e.target.value)   
        }
    }

    function findItemInDummyDB(phrase){
        let regex
        try{
            regex = new RegExp(phrase, 'gi');
        }catch(e){
            console.error(e)
        }
        
        setSearchResults(
            userData.cart.filter(item => {
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

    const resultsAsHTML = searchResults.map((x, index) => <ShoppingProduct key={index} {...x} view="searchDropDown"/>)

    return(
        <div className="search">
                <input type="text" value={searchVal} onChange={handleChange} placeholder="Search" className="search--inputBox"></input>
                <div className="search--modal">
                    <div className="search--modal--searchResultContainer">{resultsAsHTML}</div>
                    <div className="search--modal--clickListener"></div>
                </div>
        </div>

    )
}