import React from "react";
import ShoppingProduct from "../ShoppingProduct/ShoppingProduct";
import NavBar from "../NavBar/NavBar"
import axios from "axios";

export default function Homepage({...props}){
    const SEARCH_URL = "http://localhost:5000/s?k="
    const PRODUCT_URL = "http://localhost:5000/p/"
    const LOGOUT_URL = "http://localhost:5000/logout"
    const [userData, setUserData] = React.useState({})
    const [currentView, setCurrentView] = React.useState("SEARCH")
    const [selectedProduct, setSelectedProduct] = React.useState("")
    const [searchResults, setSearchResults] = React.useState([])
    const [modalStatus, setModalStatus] = React.useState(false)      

    function logout(){
      axios.post(LOGOUT_URL, {dummy: 2}, {withCredentials: true})
      .then(response => {
        console.log(response)
        if(response.data === "Logged out successfully!")
        {
          window.location = "/"
        }
      }
)
      .catch(error => console.error(error))
  }

    React.useEffect(()=>{
      getUserCartFromServer()
      if(props.searchIsDone)
      {
        const searchTermWithPlusSigns = window.location.href.split("s?k=")[1]
        if(searchTermWithPlusSigns === undefined || searchTermWithPlusSigns === ""){
          window.location = "/"
        }
        const newTitle = `React Clothing Store: ${searchTermWithPlusSigns.split("+").join(" ")}`
        changeTitle(newTitle)

        const finalURL = SEARCH_URL + searchTermWithPlusSigns
        axios.get(finalURL, {withCredentials: true}).then(function(response){
          if(response.data.length >= 1){
            setSearchResults(response.data)
          }else{
            document.querySelector(".mainContainer--results").innerText = "We're sorry. That item is not on our catalogue."
          }
        }).catch(error=>{
            if(error.response){
            console.log(error.response.data, error.response.status, error.response.headers)
            }
        })
      }
      if(props.productIsSelected){
        const urlSecondHalf = window.location.href.split("/p/")[1]
        if(urlSecondHalf === undefined || urlSecondHalf === "" || !urlSecondHalf.includes("/id/")){
          window.location = "/"
        }
        const finalURL = PRODUCT_URL + urlSecondHalf
        console.log(finalURL)
        axios.get(finalURL, {withCredentials: true}).then(response => {
          setSelectedProduct(response.data[0])
        })
      }
    },[])

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
  
    const dataAsCartView = searchResults.map((item, index) => <ShoppingProduct key={index} {...item} view="searchResult"/>)
  
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

    React.useEffect(()=>{
      if(selectedProduct === undefined || selectedProduct === ""){
        return
      }
      setCurrentView("PRODUCT")
    },[selectedProduct])
    return(
      
      <div onClick={toggleModal}>
          <NavBar modalStatus={modalStatus} logout={logout} userData={userData} showModal={showModal} hideModal={hideModal} storeSearchResults={storeSearchResults}/>
          { currentView === "SEARCH" &&
              <>
                  <div className="mainContainer--results">
                      {dataAsCartView}
                  </div>
              </>
          }
          {
            currentView === "PRODUCT" &&
            <>
              <ShoppingProduct {...selectedProduct} view="fullSize"/>
            </>
          }
      </div>
    )
}