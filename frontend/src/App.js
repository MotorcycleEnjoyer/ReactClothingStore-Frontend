import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'

import Homepage from './Components/Homepage/Homepage';
import Homepage__PRODUCT from './Components/Homepage/Homepage__PRODUCT';
import Homepage__SEARCH from './Components/Homepage/Homepage__SEARCH';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Cart from './Components/Cart/Cart';
import FileNotFound from './Components/FileNotFound/FileNotFound';

import './App.css'
import './Components/SearchBar/Search.css'
import './Components/ShoppingProduct/ShoppingProduct.css';
import './Components/NavBar/NavBar.css'

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/s" element={<Homepage__SEARCH searchIsDone={true}/>}/>
            <Route path="/p/*" element={<Homepage__PRODUCT  productIsSelected={true}/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/*" element={<FileNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
