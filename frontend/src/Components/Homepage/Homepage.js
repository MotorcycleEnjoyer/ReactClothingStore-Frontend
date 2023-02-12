import React from "react";
import CategoryButton from "../CategoryButton/CategoryButton";
import allCategories from "../CategoryButton/categories"
import NavBar from "../NavBar/NavBar"
import axios from "axios";

export default function Homepage({...props}){
    const LOGOUT_URL = "http://localhost:5000/logout"
    const [userData, setUserData] = React.useState({})
    const [modalStatus, setModalStatus] = React.useState(false)      
    const [categories, setCategories] = React.useState(allCategories.dummyDB)

    function logout(){
      axios.post(LOGOUT_URL, {dummy: 2}, {withCredentials: true})
      .then(response => {
        alert(response.data)
        if(response.data === "Logged out successfully!")
        {
          window.location = "/"
        }
      })
      .catch(error => console.error(error))
  }

    React.useEffect(()=>{
      getUserCartFromServer()
    },[])

    function getUserCartFromServer(){
      axios.get("http://localhost:5000/shoppingCart", {withCredentials: true}).then((response) => {
        setUserData(response.data)
      }).catch(error => {
        console.error(error)
      })
    }

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

    const categoryDataAsHtml = categories.map((item, index) => <CategoryButton key={index} name={item} />)

    return(
      
      <div onClick={toggleModal}>
          <NavBar modalStatus={modalStatus} logout={logout} userData={userData} showModal={showModal} hideModal={hideModal}/>
          <div className="categoryButtonParentContainer">
            {categoryDataAsHtml}
          </div>
      </div>
    )
}