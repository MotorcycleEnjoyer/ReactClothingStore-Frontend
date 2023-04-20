import React from "react"

export default function Order ({ orderDetails, index }) {
    console.log(orderDetails, index)
    return (
        <div>
            <h2>Order #{index}</h2>
            <p>{orderDetails}</p>
        </div>
    )
}
