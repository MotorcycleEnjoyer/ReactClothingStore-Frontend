import React from "react";
import CategoryButton from "../CategoryButton/CategoryButton";
import allCategories from "../CategoryButton/categories"
import NavBar from "../NavBar/NavBar"

export default function Homepage({...props}){
    const [modalStatus, setModalStatus] = React.useState(false)      
    const [categories, setCategories] = React.useState(allCategories.dummyDB)

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
          <NavBar modalStatus={modalStatus} logout={props.logout} length={props.length} showModal={showModal} hideModal={hideModal}/>
          <div className="categoryButtonParentContainer">
            {categoryDataAsHtml}
          </div>
      </div>
    )
}