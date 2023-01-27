import React from "react";
import ShoppingProduct from "../ShoppingProduct/ShoppingProduct";
import NavBar from "../NavBar/NavBar"
import axios from "axios";

export default function Homepage({...props}){
    const SEARCH_URL = "http://localhost:5000/s?k="
    const [userData, setUserData] = React.useState({
        session: "9a2a94eb-c327-4625-bd4d-cb9e1d53bcfb",
        cart: [
          {
            id: 1,
            name: "Generic T Shirt",
            manufacturerOrBrand: "T-Shirt-CO",
            size: 5,
            ageCategory: "5-10",
            sexCategory: "M",
            typeOfClothing: "T-Shirt",
            colorOptions: ["red", "green", "orange", "pink"],
            imagePreviewURL: "a",
            variationIsInStock: [{color: "red", amountInStock: 10}, {color: "green", amountInStock: 3}, {color: "orange", amountInStock: 0}, {color:"pink", amountInStock:2}],
            weight: {grams: 50},
            dimensions: "LxWxH",
            price: 5.99,
            materials: {polyester: "50%", cotton: "50%"},
            amount: 1,
            totalCost: 5.99,
        },
        {
            id: 2,
            name: "Not Generic T Shirt",
            manufacturerOrBrand: "T-Shirt-CO",
            size: 5,
            ageCategory: "10-15",
            sexCategory: "F",
            typeOfClothing: "T-Shirt",
            colorOptions: ["red", "green", "orange", "pink"],
            imagePreviewURL: "a",
            variationIsInStock: [{color: "red", amountInStock: 2}, {color: "green", amountInStock: 3}, {color: "orange", amountInStock: 4}, {color:"pink", amountInStock: 5}],
            weight: {grams: 49},
            dimensions: "LxWxH",
            price: 5.99,
            materials: {polyester: "50%", cotton: "50%"},
            amount: 1,
            totalCost: 5.99,
            }
            ],
    })
      const [currentView, setCurrentView] = React.useState("SEARCH")
      const [selectedProduct, setSelectedProduct] = React.useState("")
      const [searchResults, setSearchResults] = React.useState([])
      const [modalStatus, setModalStatus] = React.useState(false)
      React.useEffect(()=>{
        if(props.searchIsDone)
        {
          const searchTermWithPlusSigns = window.location.href.split("s?k=")[1]
          if(searchTermWithPlusSigns === undefined || searchTermWithPlusSigns === ""){
            window.location = "/"
          }
          document.title = `React Clothing Store: ${searchTermWithPlusSigns.split("+").join(" ")}`
          const finalURL = SEARCH_URL + searchTermWithPlusSigns
          axios.get(finalURL).then(function(response){
            if(response.data.length >= 1){
              setSearchResults(response.data)
            }else{
              document.querySelector(".mainContainer--results").innerText = "We're sorry. That item is not on our catalogue."
            }
          }).catch(error=>{
              if(error.response){
              console.log("BRUH")
              console.log(error.response.data, error.response.status, error.response.headers)
              }
          })
        }
      },[])
    
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
        // setCurrentView("SEARCH")
      }
    
      const dataAsCartView = searchResults.map((item, index) => <ShoppingProduct key={index} chooseProduct={chooseProduct} {...item} view="searchResult"/>)
    
      function chooseProduct(id){
        let data = userData.cart.filter(item => item.id === id)[0]
        if(data===undefined)
          return
        hideModal()
        setSelectedProduct(data)
      }
    
      function toggleModal(e){
        let target = e.target
        let classType = target.className
        console.log(target, classType)
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
        console.log({...selectedProduct})
        setCurrentView("PRODUCT")
      },[selectedProduct])
    return(
        
        <div onClick={toggleModal}>
            <NavBar modalStatus={modalStatus} userData={userData} showModal={showModal} hideModal={hideModal} storeSearchResults={storeSearchResults}/>
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