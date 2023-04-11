import React from "react"
import shirt from "../../../t-shirt-preview.png"
import StarRating from "../../SmallComponents/StarRatingSelector/StarRating"
import ColorSelector from "../../SmallComponents/ColorSelector/ColorSelector"

export default function FullSize ({ name, amount, details, userSelectedParameters, modal, averageRating, submitToServer }) {
    return (
        <div className="shoppingProduct--fullSize">
            <div className="fadeModal">
                <div className="fadeModal--content">SampleText</div>
            </div>
            <div className="productHeader">
                <h1>{details.name}</h1>
                <h3>by {details.manufacturerOrBrand}</h3>
            </div>
            <div className="productDetails">
                <div><img className="fullSize-Image" src={shirt} alt={name}></img></div>
                <div>TYPE: {details.typeOfClothing}</div>
                <div>PRICE: {details.price}</div>
                <div>Polyester: {details.materials.polyester}</div>
                <div>Cotton: {details.materials.cotton}</div>
                { !modal &&
                    <StarRating productId={details.id} initialAverageRating={averageRating}/>
                }
            </div>
            <form onSubmit={submitToServer} id="addToCart">
                { modal === true &&
                    <div>
                        <fieldset className="oldData">
                            <label htmlFor="oldData">Old Selection</label>
                            <br></br>
                            <label htmlFor="size">SIZE:</label>
                            <select className="size" disabled><option>{userSelectedParameters.size}</option></select>

                            <label htmlFor="age">AGE RANGE:</label>
                            <select className="age" disabled><option>{userSelectedParameters.ageCategory}</option></select>

                            <label htmlFor="sex">M/F:</label>
                            <select className="sex" disabled><option>{userSelectedParameters.sexCategory}</option></select>

                            <br></br>
                            <label htmlFor="color">COLOR OPTIONS:</label>
                            <select className="color" disabled><option>{userSelectedParameters.color}</option></select>

                            <br></br>
                            <label htmlFor="amount">Quantity:</label>
                            <select className="amount" disabled><option>{amount}</option></select>
                        </fieldset>
                    </div>
                }
                <fieldset>
                    <b>New Selection:</b>
                    <br></br>
                    <label htmlFor="sizeSelector">SIZE:</label>
                    <select className="sizeSelector" name="size">
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                    <label htmlFor="ageSelector">AGE RANGE:</label>
                    <select className="ageSelector" name="ageCategory">
                        <option value="adults">adults</option>
                        <option value="kids">kids</option>
                    </select>
                    <br></br>
                    <label htmlFor="sexSelector">M/F: </label>
                    <select className="sexSelector" name="sexCategory">
                        <option value="M">M</option>
                        <option value="F">F</option>
                    </select>
                    <br></br>
                    <br></br>
                    <div>COLOR OPTIONS:
                        <label htmlFor="colorSelector"></label>
                        <select className="colorSelector" name="color">{details.colorOptions.map((item, index) => <option key={index} value={item}>{item}</option>)}</select>
                    </div>

                    <ColorSelector colorArray={details.colorOptions} />

                    <div>Quantity:
                        <select className="quantitySelector" name="quantity">
                            {
                                Array.from(Array(20)).map((x, index) => <option key={index} value={index + 1}>{index + 1}</option>)
                            }
                        </select>
                    </div>
                    <br></br>
                    <br></br>
                    <button className="submitProductButton">{ document.querySelector(".cartItem--modal") !== null ? "Submit Changes" : "Add To Cart" }</button>
                </fieldset>
            </form>
        </div>
    )
}
