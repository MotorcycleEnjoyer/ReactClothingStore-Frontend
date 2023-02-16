import React from "react";
import ShoppingProduct from "../ShoppingProduct/ShoppingProduct";
import NavBar from "../NavBar/NavBar"
import axios from "axios";

export default function Homepage__PRODUCT({...props}){
    const PRODUCT_URL = "http://localhost:5000/p/"
    const TOO_MANY_REQUESTS = "TOO MANY REQUESTS! SLOW DOWN!"
    const [selectedProduct, setSelectedProduct] = React.useState("")
    const [modalStatus, setModalStatus] = React.useState(false)      

    React.useEffect(()=>{
      loadProductFromUrl()
    },[])

    function storeDataInProductComponent(data){
      setSelectedProduct(<ShoppingProduct {...data} addToCart={props.addToCart} view="fullSize"/>)
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
            if(response.data === TOO_MANY_REQUESTS)
            {
              alert(TOO_MANY_REQUESTS)
              window.location = "/"
            }
            storeDataInProductComponent(response.data)
            document.title=`React Clothing Store: ${response.data.details.name}`
          }).catch(error => console.error(error))
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
        <NavBar modalStatus={modalStatus} logout={props.logout} length={props.length} showModal={showModal} hideModal={hideModal} />
        {selectedProduct}
      </div>
    )
}