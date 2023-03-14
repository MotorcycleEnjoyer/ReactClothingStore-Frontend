import React from "react"
import { addProductReview } from "../../../API/apiCalls"

export default function ReviewBox ({ productId, initialReviews }) {
    const [reviewArray, setReviewArray] = React.useState(initialReviews || [])
    const [review, setReview] = React.useState("")
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
        // const result = await login(credentials)
        const { reviews } = await addProductReview(productId, productReview)
        setReviewArray(() => reviews)
        console.log(reviews)
    }

    return (
        <div className="productReviewContainer">
            <form onSubmit={handleReviewSubmission}>
                <textarea
                    className="productReviewInput"
                    name="productReview"
                    maxLength="200"
                    onChange={handleChange}
                    value={review}>
                </textarea>
                <div>Maximum 200 characters || ( {remainingChars} Remaining )</div>
                <button type="submit">Submit Review</button>
            </form>
            {reviewsAsHTML}
        </div>
    )
}
