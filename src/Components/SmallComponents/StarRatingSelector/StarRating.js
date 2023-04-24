import React from "react"
import { addProductRating } from "../../../API/apiCalls"
import { LoginContext } from "../../../Contexts/ShoppingContext"

export default function StarRating ({ productId, initialAverageRating }) {
    const isLoggedIn = React.useContext(LoginContext)
    const [avgRating, setAvgRating] = React.useState(initialAverageRating || 0)

    async function setStarRating (finalIndex) {
        const allStars = document.querySelectorAll(".star")
        allStars.forEach(item => item.classList.remove("alreadyVoted"))
        allStars.forEach((item, currIndex) => currIndex <= finalIndex && item.classList.add("alreadyVoted"))
        // due to ZERO INDEX, will add one here.
        if (isLoggedIn) {
            const { averageRating } = await addProductRating(finalIndex + 1, productId)
            console.log(averageRating)
            setAvgRating(averageRating || 0)
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

    const starSelector = starArr.map((value, index) => <div className={`star ${index + 1 <= avgRating && "alreadyVoted"}`} key={index} onClick={() => { setStarRating(index) }} onMouseEnter={() => { starHover(index) }} onMouseLeave={() => { starClear(index) }}>{value}</div>)

    return (
        <div className="stars" >
            {starSelector}
            <span className="avgStarRating">({avgRating.toFixed(1)})</span>
        </div>
    )
}
