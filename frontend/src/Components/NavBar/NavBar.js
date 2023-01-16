import Search from "../Search/Search"
import React from "react"

export default function NavBar({...props}){
    return(
        <nav className="navBar">
            <Search />
            <button onClick={props.changeView}>LOGIN</button>
            <button onClick={props.changeView}>REGISTER</button>
            <button onClick={props.changeView}>MY CART</button>
        </nav>
    )
}