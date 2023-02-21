import React from "react";
import ShoppingProduct from "../../SmallComponents/ShoppingProduct/ShoppingProduct";
import axios from "axios";

export default function Homepage__SEARCH({...props}){
    const SEARCH_URL = "http://localhost:5000/s?k=" 
    const [searchResults, setSearchResults] = React.useState([])

    React.useEffect(()=>{
        loadSearchResultsFromUrlValues()
    },[window.location.href])

    function loadSearchResultsFromUrlValues(){
        const searchTermWithPlusSigns = window.location.href.split("s?k=")[1]
        if(searchTermWithPlusSigns === undefined || searchTermWithPlusSigns === ""){
            window.location = "/"
        }
        const newTitle = `React Clothing Store Search: ${searchTermWithPlusSigns.split("+").join(" ")}`
        changeTitle(newTitle)

        const finalURL = SEARCH_URL + searchTermWithPlusSigns
        fetchSearchResultsFromServer(finalURL)
    }

    function fetchSearchResultsFromServer(finalURL){
        axios.get(finalURL, {withCredentials: true}).then(function(response){
            if(response.data === "INVALID SEARCH TERMS!!!")
            {
            alert("INVALID SEARCH TERMS!!!")
            return document.location = "/"
            }
            if(response.data.length >= 1){
            setSearchResults(response.data.map((item, index) => <ShoppingProduct key={index} {...item} view="searchResult"/>))
            }else{
            setSearchResults([])
            document.querySelector(".sorryItem").style.visibility = "visible"
            }
        }).catch(error=>{
            if(error.response){
            console.log(error.response.data, error.response.status, error.response.headers)
            }
        })
    }
    
    function changeTitle(title){
      document.title = title
    }

    return(
        <div className="mainContainer--results">
            <div style={{visibility: "hidden"}} className="sorryItem">"We're sorry. That item is not on our catalogue."</div>            {searchResults}
        </div>
    )
}