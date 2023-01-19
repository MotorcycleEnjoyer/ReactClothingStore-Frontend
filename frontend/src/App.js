import logo from './logo.svg';
import './App.css';
import './Components/ShoppingProduct/ShoppingProduct.css'
import './Components/Search/Search.css'
import './Components/NavBar/NavBar.css'
import NavBar from "./Components/NavBar/NavBar"
import React from 'react';
import {userData} from "./DummyProductDB"
import ShoppingProduct from './Components/ShoppingProduct/ShoppingProduct';

function App() {
  const [currentView, setCurrentView] = React.useState("SEARCH")
  const [selectedProduct, setSelectedProduct] = React.useState("NONE")
  const [searchResults, setSearchResults] = React.useState([])

  function hideModal(){
    document.querySelector(".search--modal").style.display = "none"
  }

  function showModal(){
    document.querySelector(".search--modal").style.display = "block"
  }

  function storeSearchResults(results){
    console.log(`results: ${results}`)
    setSearchResults(results)
    hideModal()
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
      <NavBar userData={userData} showModal={showModal} hideModal={hideModal} storeSearchResults={storeSearchResults} selectProduct={selectProduct} changeView={changeView}/>
      
      
      <div className="mainContainer">
      { currentView === "SEARCH" &&
        <>
          <div className="mainContainer--sideBar">SIDEBAR</div>
          <div className="mainContainer--results">
            {dataAsCartView}
          </div>
        </>
      }
      {
        currentView === "LOGIN" &&
        <>
          <h1>Please enter your credentials</h1>
          <input type="text" name="username" placeholder='Username'></input>
          <input type="password" name="password" placeholder='Password'></input>
          <button onClick={changeView}>MAIN PAGE</button>
        </>
        }
        {
          currentView === "REGISTER" &&
          <>
          <h1>Register account!</h1>
          <form>
          </form>
          <button onClick={changeView}>MAIN PAGE</button>
          </>
        }
        {
          currentView === "MY CART" &&
          <>
            <button onClick={changeView}>MAIN PAGE</button>
            <h1>My Shopping Cart</h1>
            <div>
              {dataAsCartView}
            </div>
          </>
        }
        {
          currentView === "PRODUCT" &&
          <>
              <ShoppingProduct {...selectedProduct} view="fullSize"/>
              <button onClick={changeView}>MAIN PAGE</button>
          </>
        }
      </div>
    </div>
  );
}

export default App;
