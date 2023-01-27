import Search from "../Search/Search"
import React from "react"

export default function NavBar({...props}){
    return(
        <nav className="navBar">
            <button onClick={()=>window.location.assign("/")}>HOME</button>
            <Search modalStatus={props.modalStatus} userData={props.userData} showModal={props.showModal} hideModal={props.hideModal}/>
            <button onClick={()=> window.location.assign("/login")}>LOGIN</button>
            <button onClick={()=> window.location.assign("/register")}>REGISTER</button>
            <button onClick={()=> window.location.assign("/cart")}>MY CART</button>
        </nav>
    )
}