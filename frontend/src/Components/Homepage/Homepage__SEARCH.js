import React from "react";
import ShoppingProduct from "../ShoppingProduct/ShoppingProduct";
import NavBar from "../NavBar/NavBar"
import axios from "axios";

export default function Homepage__SEARCH(){
    const SEARCH_URL = "http://localhost:5000/s?k="
    const LOGOUT_URL = "http://localhost:5000/logout"
    const [userData, setUserData] = React.useState({})
    const [searchResults, setSearchResults] = React.useState([])
    const [modalStatus, setModalStatus] = React.useState(false)      

    React.useEffect(()=>{
        getUserCartFromServer()
        loadSearchResultsFromUrlValues()
    },[])

    function logout(){
      axios.post(LOGOUT_URL, {dummy: 2}, {withCredentials: true})
      .then(response => {
        alert(response.data)
        if(response.data === "Logged out successfully!")
        {
          window.location = "/"
        }
      })
      .catch(error => console.error(error))
  }

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
            document.querySelector(".mainContainer--results").innerText = "We're sorry. That item is not on our catalogue."
            }
        }).catch(error=>{
            if(error.response){
            console.log(error.response.data, error.response.status, error.response.headers)
            }
        })
    }

    function getUserCartFromServer(){
      axios.get("http://localhost:5000/shoppingCart", {withCredentials: true}).then((response) => {
        setUserData(response.data)
        console.log(response.data)
      }).catch(error => {
        console.error(error)
      })
    }
    
    function changeTitle(title){
      document.title = title
    }

    function hideModal(){
      document.querySelector(".search--modal").style.display = "none"
      setModalStatus(false)
    }
  
    function showModal(){
      document.querySelector(".search--modal").style.display = "block"
      setModalStatus(true)
    }
  
    function storeSearchResults(results){
      setSearchResults(results)
    }
  
    function toggleModal(e){
        let target = e.target
        let classType = target.className
        if(classType ==="search--modal--clickListener" || classType==="navBar" || target.type ==="submit"){
          hideModal()
        }
        if(classType === "search--inputBox"){
          showModal()
        }
      }

    return(
      <div onClick={toggleModal}>
        <NavBar modalStatus={modalStatus} logout={logout} userData={userData} showModal={showModal} hideModal={hideModal} storeSearchResults={storeSearchResults}/>
        <div className="mainContainer--results">
            {searchResults}
        </div>
      </div>
    )
}