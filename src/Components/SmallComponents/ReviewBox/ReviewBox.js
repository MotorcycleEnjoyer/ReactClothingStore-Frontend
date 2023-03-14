import React from "react"
import { addProductReview } from "../../../API/apiCalls"

export default function ReviewBox ({ productId, initialReviews, loggedIn }) {
    const [reviewArray, setReviewArray] = React.useState(initialReviews || [])
    const [review, setReview] = React.useState("")
    const [hasNotSubmitted, setHasNotSubmitted] = React.useState(false)
    const remainingChars = 200 - review.length
    const reviewsAsHTML = reviewArray.map((item, index) => <div className="review" key={index}>{item}</div>)

    function handleChange (e) {
        const value = e.target.value
        setReview(value)
    }

    async function handleReviewSubmission (e) {
        e.preventDefault()
        const rawFormData = new FormData(e.target)
        const { productReview } = Object.fromEntries(rawFormData)
        if (productReview === "") {
            return
        }
        // const result = await login(credentials)
        const { reviews } = await addProductReview(productId, productReview)
        setReviewArray(() => reviews)
        setReview(() => "")
        setHasNotSubmitted(() => false)
        console.log(reviews)
    }

    const remainingCharactersStyle = {
        color: remainingChars >= 50 ? "palegreen" : "yellow",
        fontWeight: "bold",
        fontSize: "50px"
    }

    return (
        <div className="productReviewContainer">
            { loggedIn &&
            <>
                { !hasNotSubmitted && <button onClick={() => { setHasNotSubmitted(() => true) }}>Write a Review</button> }

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
                        <button onClick={() => { setReview(() => ""); setHasNotSubmitted(() => false) }}>Cancel</button>
                        <button type="submit">Submit Review</button>
                    </form>
                }
            </>

            }
            <h1>REVIEWS</h1>
            <div className="reviewsAsHTML" >
                {((reviewsAsHTML.length > 0) && reviewsAsHTML) || <h3 style={{ textAlign: "center", color: "darkgreen" }}>Be the first to review!</h3>}
            </div>
        </div>
    )
}
