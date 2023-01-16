import React from "react"
import {userData} from "../../DummyProductDB"
import ShoppingProduct from "../ShoppingProduct/ShoppingProduct"

export default function Search(){
    const [searchVal, setSearchVal] = React.useState("")
    const [searchResults, setSearchResults] = React.useState([])
    function handleChange(e){
        setSearchVal(e.target.value)
    }

    function findItemInDummyDB(phrase){
        setSearchResults(
            userData.cart.filter(item => {
                const regex = new RegExp(phrase, 'gi');
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
                    <div className="search--searchResultContainer">{resultsAsHTML}</div>
                    <div className="search--modal--clickListener"></div>
                </div>
                
                
        </div>

    )
}