import React from "react";
import ShoppingProduct from "../ShoppingProduct/ShoppingProduct";
import axios from "axios";

export default function Homepage__PRODUCT({addToCart}){
    const PRODUCT_URL = "http://localhost:5000/p/"
    const TOO_MANY_REQUESTS = "TOO MANY REQUESTS! SLOW DOWN!"
    const [selectedProduct, setSelectedProduct] = React.useState(null)

    React.useEffect(()=>{
      loadProductFromUrl()
    },[])

    function storeDataInProductComponent(data){
      setSelectedProduct(<ShoppingProduct {...data} addToCart={addToCart} view="fullSize"/>)
    }

    function loadProductFromUrl(){
        const urlSecondHalf = window.location.href.split("/p/")[1]
        if(urlSecondHalf === undefined || urlSecondHalf === "" || !urlSecondHalf.includes("/id/")){
          window.location = "/"
        }
        const finalURL = PRODUCT_URL + urlSecondHalf
        fetchProductFromServer(finalURL)
    }

    function fetchProductFromServer(finalURL){
        axios.get(finalURL, {withCredentials: true}).then(response => {
            if(response.data === TOO_MANY_REQUESTS)
            {
              alert(TOO_MANY_REQUESTS)
              window.location = "/"
            }
            storeDataInProductComponent(response.data)
            document.title=`React Clothing Store: ${response.data.details.name}`
          }).catch(error => console.error(error))
    }

    return(
        <div className="fullsizeProductContainer">
          {selectedProduct}
        </div>
    )
}