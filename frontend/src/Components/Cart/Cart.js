import axios from "axios"
import React from "react"
import ShoppingProduct from "../ShoppingProduct/ShoppingProduct"

export default function Cart(){

    const [userData, setUserData] = React.useState([])

    function getUserCartFromServer(){
        axios.get("http://localhost:5000/shoppingCart", {withCredentials: true}).then((response) => {
          setUserData(response.data.shoppingCart)
          console.log(response.data)
        }).catch(error => {
          console.error(error)
        })
      }

    React.useEffect(()=>{
        getUserCartFromServer()
    }, [])

    function handleClick(){
        // pull quantity values, if they changed at all, and send em to server.
    }

    const allCartItems = userData.map((item, index) => <ShoppingProduct key={index} {...item} view={"cart"} />)
    return(
        <>
            <button onClick={()=>window.location="/"}>HOME</button>
            <h1>My Shopping Cart</h1>
            <div>
                {allCartItems}
            </div>
            <button onClick={handleClick}>Checkout</button>
        </>
    )
}