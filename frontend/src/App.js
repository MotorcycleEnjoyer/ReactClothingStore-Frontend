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
  const [currentView, setCurrentView] = React.useState("MAIN PAGE")

  const dataAsCartView = userData.cart.map((item, index) => <ShoppingProduct key={index} {...item} view="cart"/>)
  function changeView(e){
    console.log(e.target.innerText)
    setCurrentView(e.target.innerText)
  }

  return (
    <div className="App">
      <NavBar changeView={changeView}/>
      
      
      <header className="App-header">
      { currentView === "MAIN PAGE" &&
        <>
          
          
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
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
      </header>
    </div>
  );
}

export default App;
