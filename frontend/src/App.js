import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Homepage from './Components/Homepage/Homepage';
import Login from './Components/Login/Login';
import './App.css'
import './Components/SearchBar/Search.css'
import './Components/ShoppingProduct/ShoppingProduct.css';
import './Components/NavBar/NavBar.css'
import Register from './Components/Register/Register';
import Cart from './Components/Cart/Cart';
import FileNotFound from './Components/FileNotFound/FileNotFound';

const DATA_URL = "http://localhost:5000/data"

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/s" element={<Homepage searchIsDone={true}/>}/>
            <Route path="/p/*" element={<Homepage  productIsSelected={true}/>}/>
            <Route path="/*" element={<FileNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
