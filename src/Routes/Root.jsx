import React, { useContext } from "react"
import { Outlet } from "react-router-dom"
import NavBar from "../Components/NavBar/NavBar"
import { logout } from "../API/apiCalls"
import { ShoppingCartContext } from "../Contexts/ShoppingContext"

export default function Root () {
    const cart = useContext(ShoppingCartContext)

    function hideModal () {
        document.querySelector(".search--modal").style.display = "none"
    }

    function showModal () {
        document.querySelector(".search--modal").style.display = "block"
    }

    function toggleModal (e) {
        const target = e.target
        const classType = target.className
        if (classType === "search--modal--clickListener" || classType === "navBar" || target.type === "submit") {
            hideModal()
        }
        if (classType === "search--inputBox") {
            showModal()
        }
    }

    return (
        <div onClick={toggleModal} className="navRoot">
            <NavBar
                length={cart?.length || 0}
                logout = {logout}
                hideModal = {hideModal}
            />
            <Outlet />
        </div>
    )
}
