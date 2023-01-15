import Search from "./Search"
import React from "react"

export default function NavBar({...props}){
    return(
        <nav id="navBar">
            <Search />
            <button onClick={props.changeView}>LOGIN</button>
            <button onClick={props.changeView}>REGISTER</button>
            <button onClick={props.changeView}>MY CART</button>
        </nav>
    )
}