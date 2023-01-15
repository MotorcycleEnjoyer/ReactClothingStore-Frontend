import React from "react"
import {userData} from "../DummyProductDB"
import ShoppingProduct from "./ShoppingProduct"

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

    const resultsAsHTML = searchResults.map((x, index) => <ShoppingProduct key={index} {...x} view="full"/>)

    return(
        <>
                <input type="text" value={searchVal} onChange={handleChange} placeholder="Search"></input>
                {resultsAsHTML}
        </>

    )
}