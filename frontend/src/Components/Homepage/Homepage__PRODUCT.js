import React from "react";
import ShoppingProduct from "../ShoppingProduct/ShoppingProduct";
import NavBar from "../NavBar/NavBar"
import axios from "axios";

export default function Homepage__PRODUCT(){
    const LOGOUT_URL = "http://localhost:5000/logout"
    const PRODUCT_URL = "http://localhost:5000/p/"
    const [userData, setUserData] = React.useState({})
    const [selectedProduct, setSelectedProduct] = React.useState("")
    const [modalStatus, setModalStatus] = React.useState(false)      


    React.useEffect(()=>{
      getUserCartFromServer()
      loadProductFromUrl()
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

    function loadProductFromUrl(){
        const urlSecondHalf = window.location.href.split("/p/")[1]
        if(urlSecondHalf === undefined || urlSecondHalf === "" || !urlSecondHalf.includes("/id/")){
          window.location = "/"
        }
        const finalURL = PRODUCT_URL + urlSecondHalf
        fetchProductFromServer(finalURL)
    }

    function fetchProductFromServer(finalURL){
        axios.get(finalURL, {withCredentials: true}).then(response => {
            if(response.data === "TOO MANY REQUESTS! SLOW DOWN!")
            {
              alert("Too many HTTP requests in short time")
              window.location = "/"
            }
            setSelectedProduct(<ShoppingProduct {...response.data} view="fullSize"/>)
            document.title=`React Clothing Store: ${response.data.name}`
          }).catch(error => console.error(error))
    }

    function getUserCartFromServer(){
      axios.get("http://localhost:5000/shoppingCart", {withCredentials: true}).then((response) => {
        setUserData(response.data)
        console.log(response.data)
      }).catch(error => {
        console.error(error)
      })
    }

    function hideModal(){
      document.querySelector(".search--modal").style.display = "none"
      setModalStatus(false)
    }
  
    function showModal(){
      document.querySelector(".search--modal").style.display = "block"
      setModalStatus(true)
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
        <NavBar modalStatus={modalStatus} logout={logout} userData={userData} showModal={showModal} hideModal={hideModal} />
        {selectedProduct}
      </div>
    )
}