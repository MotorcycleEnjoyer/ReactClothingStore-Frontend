import logo from './logo.svg';
import './App.css';
import NavBar from "./Components/NavBar"
import React from 'react';
import {userData} from "./DummyProductDB"
import ShoppingProduct from './Components/ShoppingProduct';

function App() {
  const [currentView, setCurrentView] = React.useState("MAIN PAGE")

  const propsObject = userData.cart[0]
  function changeView(e){
    console.log(e.target.innerText)
    setCurrentView(e.target.innerText)
  }

  return (
    <div className="App">
      <NavBar changeView={changeView}/>
      <ShoppingProduct {...propsObject}/>
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
      </header>
    </div>
  );
}

export default App;
