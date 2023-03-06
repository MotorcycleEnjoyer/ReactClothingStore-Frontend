import Search from "../SmallComponents/SearchBar/SearchBar"
import shoppingCartLogo from "../../shopping-cart-icon.png"
import React from "react"
import { LoginContext } from "../../App"
import { Link } from "react-router-dom"

export default function NavBar ({ ...props }) {
    const amountInCart = props.length
    const loggedIn = React.useContext(LoginContext)
    const [searchDestination, setSearchDestination] = React.useState("")

    function navigateWithoutRefresh (query) {
        const productNameWithPlusSigns = query.split(" ").join("+")
        setSearchDestination(productNameWithPlusSigns)
    }

    React.useEffect(() => {
        if (searchDestination !== "") {
            const linkItem = document.querySelector("#searchBox")
            linkItem.click()
            setSearchDestination("")
            props.hideModal()
        }
    }, [searchDestination])

    return (
        <nav className="navBar">
            <Link id="searchBox" to={`/s/${searchDestination}`} style={{ display: "none" }} value={searchDestination}></Link>

            <Link reloadDocument to="/" className="homeLogo" >HOME</Link>
            <Search navigateWithoutRefresh={navigateWithoutRefresh}/>
            <Link to="/cart" onClick={props.hideModal} className="shoppingCartIcon" style={{ backgroundImage: `url('${shoppingCartLogo}')` }}><span className="cartIconSpan">{amountInCart}</span></Link>

            {loggedIn &&
                <div className="homeLogo" onClick={() => props.logout()}>LOGOUT</div>
            }

            {!loggedIn &&
                <>
                    <Link className="homeLogo" to="/login">LOGIN</Link>
                    <Link className="homeLogo" to="/register">REGISTER</Link>
                </>
            }
        </nav>
    )
}
