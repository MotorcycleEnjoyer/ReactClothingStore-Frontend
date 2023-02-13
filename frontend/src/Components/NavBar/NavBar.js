import Search from "../SearchBar/SearchBar"
import shoppingCartLogo from "../../shopping-cart-icon.png"
import React from "react"

export default function NavBar({...props}){
    console.log(props.userData)
    const [amountInCart, setAmountInCart] = React.useState("")
    React.useEffect(()=>{
        if(props.userData !== undefined){
            if(props.userData.shoppingCart !== undefined){
                setAmountInCart(props.userData.shoppingCart.length)
            }
        }
    },[props])

    return(
        <nav className="navBar">
            <button onClick={()=>window.location.assign("/")}>HOME</button>
            <Search modalStatus={props.modalStatus} userData={props.userData} showModal={props.showModal} hideModal={props.hideModal}/>

            <div onClick={()=> window.location.assign("/cart")} className="shoppingCartIcon" style={{backgroundImage: `url('${shoppingCartLogo}')`}}><span className="cartIconSpan">{amountInCart}</span></div>
            <button onClick={()=> props.logout()}>LOGOUT</button>
            <button onClick={()=> window.location.assign("/login")}>LOGIN</button>
            <button onClick={()=> window.location.assign("/register")}>REGISTER</button>
            <button onClick={()=> window.location.assign("/cart")}>MY CART</button>
        </nav>
    )
}