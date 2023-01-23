import logo from './logo.svg';
import './App.css';
import './Components/ShoppingProduct/ShoppingProduct.css'
import './Components/Search/Search.css'
import './Components/NavBar/NavBar.css'
import NavBar from "./Components/NavBar/NavBar"
import React from 'react';
import ShoppingProduct from './Components/ShoppingProduct/ShoppingProduct';
import axios from 'axios'

const DATA_URL = "http://localhost:5000/data"

function App() {

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
  const [selectedProduct, setSelectedProduct] = React.useState("NONE")
  const [searchResults, setSearchResults] = React.useState([])
  const [modalStatus, setModalStatus] = React.useState(false)

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

  const dataAsCartView = searchResults.map((item, index) => <ShoppingProduct key={index} selectProduct={selectProduct} {...item} view="searchResult"/>)
  function selectProduct(id){
    let data = userData.cart.filter(item => item.id === id)[0]
    if(data===undefined)
      return
    hideModal()
    setSelectedProduct(data)
    console.log(selectedProduct)
    setCurrentView("PRODUCT")
  }
  
  function changeView(e){
    console.log(e.target.innerText)
    setCurrentView(e.target.innerText)
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

  return (
    <div className="App" onClick={toggleModal}>
      
      { currentView === "SEARCH" &&
      <>
        <NavBar modalStatus={modalStatus} userData={userData} showModal={showModal} hideModal={hideModal} storeSearchResults={storeSearchResults} selectProduct={selectProduct} changeView={changeView}/>
        <div className="mainContainer">
          <div className="mainContainer--sideBar">SIDEBAR</div>
          <div className="mainContainer--results">
            {dataAsCartView}
          </div>
        </div>
      </>
        
      }
      {
        currentView === "LOGIN" &&
        <div className="mainContainer">
          <h1>Please enter your credentials</h1>
          <input type="text" name="username" placeholder='Username'></input>
          <input type="password" name="password" placeholder='Password'></input>
          <button onClick={changeView}>SEARCH</button>
        </div>
        }
        {
          currentView === "REGISTER" &&
          <div className="mainContainer">
          <h1>Register account!</h1>
          <form>
          </form>
          <button onClick={changeView}>SEARCH</button>
          </div>
        }
        {
          currentView === "MY CART" &&
          <div className="mainContainer">
            <button onClick={changeView}>SEARCH</button>
            <h1>My Shopping Cart</h1>
            <div>
              {dataAsCartView}
            </div>
          </div>
        }
        {
          currentView === "PRODUCT" &&
          <>
            <NavBar modalStatus={modalStatus} userData={userData} showModal={showModal} hideModal={hideModal} storeSearchResults={storeSearchResults} selectProduct={selectProduct} changeView={changeView}/>
            <div className="mainContainer">
              <ShoppingProduct {...selectedProduct} view="fullSize"/>
            </div>
          </>
        }
      </div>
  );
}

export default App;
