import React from "react"
import { sendProductRating, getStarAverage } from "../../../API/apiCalls"
import { LoginContext } from "../../../Contexts/ShoppingContext"

export default function StarRating ({ productId }) {
    const isLoggedIn = React.useContext(LoginContext)
    React.useEffect(() => {
        getStarAverage(productId)
    }, [])

    function setStarRating (finalIndex) {
        const allStars = document.querySelectorAll(".star")
        allStars.forEach(item => item.classList.remove("alreadyVoted"))
        allStars.forEach((item, currIndex) => currIndex <= finalIndex && item.classList.add("alreadyVoted"))
        // due to ZERO INDEX, will add one here.
        if (isLoggedIn) {
            sendProductRating(finalIndex + 1, productId)
        }
    }

    function starHover (finalIndex) {
        const allStars = document.querySelectorAll(".star")
        allStars.forEach(item => item.classList.remove("hoverState"))
        allStars.forEach((item, currIndex) => currIndex <= finalIndex && item.classList.add("hoverState"))
    }

    function starClear (finalIndex) {
        const allStars = document.querySelectorAll(".star")
        allStars.forEach(item => item.classList.remove("hoverState"))
    }

    const starArr = ["⭐", "⭐", "⭐", "⭐", "⭐"]

    const starSelector = starArr.map((value, index) => <div className="star" key={index} onClick={() => { setStarRating(index) }} onMouseEnter={() => { starHover(index) }} onMouseLeave={() => { starClear(index) }}>{value}</div>)

    return (
        <div className="stars" >
            {starSelector}
            <span className="avgStarRating">(0)</span>
        </div>
    )
}
