import Search from "../SmallComponents/SearchBar/SearchBar"
import shoppingCartLogo from "../../shopping-cart-icon.png"
import houseLogo from "../../krita-house-icon.png"
import React from "react"
import { LoginContext } from "../../Contexts/ShoppingContext"
import { Link } from "react-router-dom"
import dropdownIcon from "../../dropdownBarIcon.png"

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

    function toggleDropDown () {
        const dropDown = document.querySelector(".mobileDropdown").style
        console.log(dropDown.display)
        if (dropDown.display === "none" || dropDown.display === "") {
            dropDown.display = "block"
            setTimeout(() => {
                if (dropDown) {
                    dropDown.display = "none"
                }
            }, 1750)
        }
    }

    function hideDropDown () {
        const dropDown = document.querySelector(".mobileDropdown").style
        dropDown.display = "none"
        // in case the search thing is still up.
        props.hideModal()
    }

    return (
        <nav className="navBar">
            <div className="dropDownIcon" onClick={toggleDropDown} style={{ backgroundImage: `url('${dropdownIcon}')` }}></div>
            <div className="mobileDropdown">
                <div className="mobileDropDownContent" >
                    <Link className="mobileDropdownHome" reloadDocument to="/">HOME</Link>
                    <Link className="mobileDropDownCart" to="/cart" onClick={hideDropDown}>CART: <span className="cartIconSpan-small">{amountInCart}</span></Link>
                </div>
            </div>

            <Link id="searchBox" reloadDocument to={`/s/${searchDestination}`} style={{ display: "none" }} value={searchDestination}></Link>

            <Link reloadDocument to="/" className="homeLogo" style={{ backgroundImage: `url('${houseLogo}')` }} ></Link>
            <Search navigateWithoutRefresh={navigateWithoutRefresh}/>
            <Link to="/cart" onClick={props.hideModal} className="shoppingCartIcon" style={{ backgroundImage: `url('${shoppingCartLogo}')` }}><span className="cartIconSpan">{amountInCart}</span></Link>

            {loggedIn && <>
                <Link className="navBarButton" to="/userpage">My Info</Link>
                <div className="navBarButton" onClick={() => props.logout()}>LOGOUT</div>
            </>
            }

            {!loggedIn &&
                <>
                    <Link className="navBarButton" to="/login">LOGIN</Link>
                    <Link className="navBarButton" to="/register">REGISTER</Link>
                </>
            }
        </nav>
    )
}
