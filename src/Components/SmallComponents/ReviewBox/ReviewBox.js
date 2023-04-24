import React from "react"
import StarRating from "../StarRatingSelector/StarRating"

export default function ReviewBox ({ initialReviews, loggedIn, getNewData }) {
    const [review, setReview] = React.useState("")
    const [hasNotSubmitted, setHasNotSubmitted] = React.useState(false)
    const [starRating, setStarRating] = React.useState(null)
    const remainingChars = 200 - review.length
    const reviewsAsHTML = initialReviews.map((item, index) => <div className="review" key={index}>{item}</div>)

    function handleChange (e) {
        const value = e.target.value
        setReview(value)
    }

    async function handleReviewSubmission (e) {
        e.preventDefault()
        const payload = {
            review, starRating
        }
        getNewData(payload)
        setReview(() => "")
        setHasNotSubmitted(() => false)
        setStarRating(() => null)
    }

    const remainingCharactersStyle = {
        color: remainingChars >= 50 ? "palegreen" : "yellow",
        fontWeight: "bold",
        fontSize: "50px"
    }

    function clearState () {
        setReview(() => "")
        setHasNotSubmitted(() => false)
        setStarRating(() => null)
    }

    return (
        <div className="productReviewContainer">
            { loggedIn &&
            <>
                { !hasNotSubmitted && <button className="productReviewButton" onClick={() => { setHasNotSubmitted(() => true) }}>Write a Review</button> }

                { hasNotSubmitted &&
                    <form className="productReviewForm" onSubmit={handleReviewSubmission}>
                        <textarea
                            className="productReviewInput"
                            name="productReview"
                            maxLength="200"
                            onChange={handleChange}
                            value={review}>
                        </textarea>
                        <div><span style={remainingCharactersStyle}>{200 - remainingChars}</span>/200</div>
                        <StarRating setRating={setStarRating} rating={starRating}/>
                        <button className="productReviewButton" onClick={clearState}>Cancel</button>
                        <button className="productReviewButton" type="submit" disabled = {!starRating}>Submit Review</button>
                    </form>
                }
            </>

            }
            <h1>REVIEWS</h1>
            <div className="reviewsAsHTML" >
                {((reviewsAsHTML.length > 0) && reviewsAsHTML) || <h3 style={{ textAlign: "center", color: "white" }}>Be the first to review!</h3>}
            </div>
        </div>
    )
}
