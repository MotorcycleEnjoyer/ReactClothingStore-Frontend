import React from 'react'
import { Outlet, useLoaderData } from "react-router-dom"
import { getShoppingCart } from "../API/apiCalls"
import NavBar from '../Components/NavBar/NavBar'
import { logout } from '../API/apiCalls'

export async function loader(){
    const shoppingCart = await getShoppingCart()
    return { shoppingCart }
}

export default function NewNav(){
    const { shoppingCart } = useLoaderData()
    console.log(shoppingCart)


    const [modalStatus, setModalStatus] = React.useState(false)
    function hideModal(){
      document.querySelector(".search--modal").style.display = "none"
      setModalStatus(false)
    }
  
    function showModal(){
      document.querySelector(".search--modal").style.display = "block"
      setModalStatus(true)
    }
  
    function toggleModal(e){
      let target = e.target
      let classType = target.className
      if(classType ==="search--modal--clickListener" || classType==="navBar" || target.type ==="submit"){
        hideModal()
      }
      if(classType === "search--inputBox"){
        showModal()
      }
    }
    
    return(
        <div onClick={toggleModal}>
            <NavBar 
                length={shoppingCart?.length || 0}
                logout = {logout}
                modalStatus = {modalStatus}
                hideModal = {hideModal}
            />
            <Outlet />
        </div>
    )
}