import React from "react"
import Order from "./Order"

export default function OrderHistory () {
    const [allOrders] = React.useState([1, 2, 3])

    return (
        <div>
            <h1>Orders</h1>
            <div>
                {
                    allOrders.map((orderDetails, index) => {
                        return <Order orderDetails={orderDetails} key={index} index={index} />
                    })
                }
            </div>
        </div>

    )
}
