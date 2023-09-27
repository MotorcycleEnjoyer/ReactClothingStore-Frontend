import Search from "../SmallComponents/SearchBar/SearchBar";
import shoppingCartLogo from "../../shopping-cart-icon.png";
import houseLogo from "../../krita-house-icon.png";
import React from "react";
import { LoginContext } from "../../Contexts/ShoppingContext";
import { Link, useNavigate } from "react-router-dom";
import dropdownIcon from "../../dropdownBarIcon.png";

export default function NavBar({ ...props }) {
    const amountInCart = props.length;
    const loggedIn = React.useContext(LoginContext);
    const [searchDestination, setSearchDestination] = React.useState("");
    const navigate = useNavigate();

    function navigateWithoutRefresh(query) {
        const productNameWithPlusSigns = query.split(" ").join("+");
        setSearchDestination(productNameWithPlusSigns);
    }

    function alreadyOnSearchPage() {
        const url = window.location.href;
        if (!url.split("/s?k=")[1]) {
            return false;
        }
        return true;
    }

    React.useEffect(() => {
        if (searchDestination !== "") {
            const destination = `/s?k=${searchDestination}`;
            if (alreadyOnSearchPage()) {
                window.location.href = destination;
            }
            navigate(destination);
            console.log(`SEARCH DESTINATION: [${searchDestination}]`);
            setSearchDestination("");
            props.hideModal();
        }
    }, [searchDestination]);

    function toggleDropDown() {
        const dropDown = document.querySelector(".mobileDropdown").style;
        console.log(dropDown.display);
        if (dropDown.display === "none" || dropDown.display === "") {
            dropDown.display = "block";
            setTimeout(() => {
                if (dropDown) {
                    dropDown.display = "none";
                }
            }, 1750);
        }
    }

    return (
        <nav className="navBar">
            <div
                className="dropDownIcon"
                onClick={toggleDropDown}
                style={{ backgroundImage: `url('${dropdownIcon}')` }}
            ></div>
            <div className="mobileDropdown">
                <div className="mobileDropDownContent">
                    <Link className="mobileDropdownHome" reloadDocument to="/">
                        HOME
                    </Link>
                    {!loggedIn && (
                        <>
                            <Link className="mobileDropdownHome" to="/login">
                                LOGIN
                            </Link>
                            <Link className="mobileDropdownHome" to="/register">
                                REGISTER
                            </Link>
                        </>
                    )}
                    {loggedIn && (
                        <>
                            <Link className="mobileDropdownHome" to="/userpage">
                                My Info
                            </Link>
                            <div
                                className="mobileDropdownHome"
                                onClick={() => props.logout()}
                            >
                                LOGOUT
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Link
                to="/"
                className="homeLogo"
                style={{ backgroundImage: `url('${houseLogo}')` }}
            ></Link>
            <Search navigateWithoutRefresh={navigateWithoutRefresh} />
            <Link
                to="/cart"
                onClick={props.hideModal}
                className="shoppingCartIcon"
                style={{ backgroundImage: `url('${shoppingCartLogo}')` }}
            >
                <span className="cartIconSpan">{amountInCart}</span>
            </Link>

            {loggedIn && (
                <>
                    <Link className="navBarButton" to="/userpage">
                        My Info
                    </Link>
                    <div
                        className="navBarButton"
                        onClick={() => props.logout()}
                    >
                        LOGOUT
                    </div>
                </>
            )}

            {!loggedIn && (
                <>
                    <Link className="navBarButton" to="/login">
                        LOGIN
                    </Link>
                    <Link className="navBarButton" to="/register">
                        REGISTER
                    </Link>
                </>
            )}
        </nav>
    );
}
