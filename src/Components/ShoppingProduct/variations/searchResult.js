import React from "react"
import { Link } from "react-router-dom"
import shirt from "../../../t-shirt-preview.png"

export default function SearchResult ({ details, name, redirectToProductView }) {
    return (
        <div className="shoppingProduct--searchResult--mid" onClick={() => redirectToProductView(details.id)}>
            <Link className={`Link${details.id}`} style={{ display: "none" }} to={`/p/${details.name.split(" ").join("+")}/id/${details.id}`}></Link>
            <img src={shirt} className="shoppingProduct--searchResult--mid--image" alt={name}></img>
            <div className="shoppingProduct--searchResult--mid--details">
                <h1>{details.name}</h1>
                <div>
                    <div>price: ${details.price}</div>
                    <div>maker: {details.manufacturerOrBrand}</div>
                    <div>colors: {details.colorOptions.length}</div>
                </div>
            </div>
        </div>
    )
}
