import Search from "../SearchBar/SearchBar"
import shoppingCartLogo from "../../../shopping-cart-icon.png"
import React from "react"
import { LoginContext } from "../../../App"
import { Link } from "react-router-dom"

export default function NavBar({...props}){
    const [amountInCart, setAmountInCart] = React.useState(props.length)
    const loggedIn = React.useContext(LoginContext)
    const [searchDestination, setSearchDestination] = React.useState("")
    React.useEffect(()=>{
        setAmountInCart(props.length)
    },[props.length])

    function navigateWithoutRefresh(query){
        let productNameWithPlusSigns = query.split(" ").join("+")
        setSearchDestination(productNameWithPlusSigns)
    }

    React.useEffect(()=>{
        if(searchDestination !== "")
        {
            let linkItem = document.querySelector("#searchBox")
            linkItem.click()
            setSearchDestination("")
            props.hideModal()
        }
    },[searchDestination])

    return(
        <nav className="navBar">
            <Link id="searchBox" to={`/s?k=${searchDestination}`} style={{display:"none"}} value={searchDestination}></Link>

            <Link reloadDocument to="/" className="homeLogo" >HOME</Link>
            <Search navigateWithoutRefresh={navigateWithoutRefresh}/>
            <Link to="/cart" className="shoppingCartIcon" style={{backgroundImage: `url('${shoppingCartLogo}')`}}><span className="cartIconSpan">{amountInCart}</span></Link>

            { loggedIn && <div className="homeLogo" onClick={()=> props.logout()}>LOGOUT</div>}

            { !loggedIn && 
                <>
                    <Link className="homeLogo" to="/login">LOGIN</Link> 
                    <Link className="homeLogo" to="/register">REGISTER</Link>
                </>
            }
        </nav>
    )
}