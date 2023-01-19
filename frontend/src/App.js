import './App.css';
import './Components/ShoppingProduct/ShoppingProduct.css'
import './Components/Search/Search.css'
import './Components/NavBar/NavBar.css'
import NavBar from "./Components/NavBar/NavBar"
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import React from 'react';
import {userData} from "./DummyProductDB"
import ShoppingProduct from './Components/ShoppingProduct/ShoppingProduct';

function App() {
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
    console.log(`results: ${results}`)
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
          <Login changeView={changeView}/>
        }
        {
          currentView === "REGISTER" &&
          <Register changeView={changeView} />
        }
        {
          currentView === "MY CART" &&
          <Cart changeView={changeView} dataAsCartView={dataAsCartView}/>
        }
        {
          currentView === "PRODUCT" &&
          <>
            <NavBar modalStatus={modalStatus} userData={userData} showModal={showModal} hideModal={hideModal} storeSearchResults={storeSearchResults} selectProduct={selectProduct} changeView={changeView}/>
            <div className="mainContainer">
              <ShoppingProduct {...selectedProduct} view="fullSize"/>
              <button onClick={changeView}>SEARCH</button>
            </div>
          </>
        }
      </div>
  );
}

export default App;
