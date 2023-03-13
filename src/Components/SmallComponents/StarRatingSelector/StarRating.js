import React from "react"

export default function StarRating () {
    function setStarRating (finalIndex) {
        // starSelector.forEach((item) => item.classList.add("active"))
        const allStars = document.querySelectorAll(".star")
        allStars.forEach((item, currIndex) => currIndex <= finalIndex && item.classList.add("alreadyVoted"))
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
        </div>
    )
}
