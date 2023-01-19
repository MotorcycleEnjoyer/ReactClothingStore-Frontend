import Search from "../Search/Search"
import React from "react"

export default function NavBar({...props}){

    return(
        <nav className="navBar">
            <Search modalStatus={props.modalStatus} userData={props.userData} showModal={props.showModal} hideModal={props.hideModal} storeSearchResults={props.storeSearchResults} selectProduct={props.selectProduct}/>
            <button onClick={props.changeView}>LOGIN</button>
            <button onClick={props.changeView}>REGISTER</button>
            <button onClick={props.changeView}>MY CART</button>
        </nav>
    )
}