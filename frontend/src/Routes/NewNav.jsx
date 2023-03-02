import React from 'react'
import { Outlet } from "react-router-dom"
import NavBar from '../Components/NavBar/NavBar'
import { logout } from '../API/apiCalls'
import { useContext } from 'react'
import { ShoppingCartContext } from '../Contexts/ShoppingContext'


export default function NewNav(){
    const cart = useContext(ShoppingCartContext)

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
                length={cart.length}
                logout = {logout}
                modalStatus = {modalStatus}
                hideModal = {hideModal}
            />
            <Outlet />
        </div>
    )
}