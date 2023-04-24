import React from "react"
// import StarRating from "../../SmallComponents/StarRatingSelector/StarRating"
import ColorSelector from "../../SmallComponents/ColorSelector/ColorSelector"

export default function FullSize ({ name, amount, details, userSelectedParameters, modal, averageRating, submitToServer }) {
    function handleColorChange (e) {
        const selectedColorbox = document.querySelector(".colorInput--active")
        selectedColorbox?.classList.remove("colorInput--active")
        const item = document.querySelector(`.colorInput[value=${e.target.value}]`)
        item.classList.add("colorInput--active")
    }

    return (
        <div className="shoppingProduct--fullSize">
            <div className="productHeader">
                <h1>{details.name}</h1>
                <h3>by {details.manufacturerOrBrand}</h3>
            </div>
            <div className="productDetails">
                <div><img className="fullSize-Image" src={`/backend/ProductImages/${details.imageName}`} alt={name}></img></div>
                { !modal &&
                    <>
                        <div>TYPE: {details.typeOfClothing}</div>
                        <div>PRICE: {details.price}</div>
                        <div>Polyester: {details.materials.polyester}</div>
                        <div>Cotton: {details.materials.cotton}</div>
                        {/* <StarRating productId={details.id} initialAverageRating={averageRating}/> */}
                        <div className="stars">{["⭐", "⭐", "⭐", "⭐", "⭐"].map((item, index) => {
                            return <div key={index} className={`star ${index + 1 < averageRating && "alreadyVoted"}`}>{item}</div>
                        })}
                        <span className="avgStarRating">({averageRating.toFixed(1)})</span>
                        </div>
                    </>
                }
            </div>
            <form onSubmit={submitToServer} className="addToCartForm">
                <div className="addToCartForm--left">
                    <div>
                        <label htmlFor="sizeSelector">SIZE:</label>
                        <select className="sizeSelector" name="size" defaultValue={userSelectedParameters?.size}>
                            {["S", "M", "L", "XL", "XXL"].map((item, index) => {
                                const isSelected = item === userSelectedParameters?.size
                                return (
                                    <option
                                        key={index}
                                        value={item}
                                    >{item} {isSelected && "(Current)"}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="ageSelector">AGE RANGE:</label>
                        <select className="ageSelector" name="ageCategory" defaultValue={userSelectedParameters?.ageCategory}>
                            {["adults", "kids"].map((item, index) => {
                                const isSelected = item === userSelectedParameters?.ageCategory
                                return (
                                    <option
                                        key={index}
                                        value={item}
                                    >{item} {isSelected && "(Current)"}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="sexSelector">M/F: </label>
                        <select className="sexSelector" name="sexCategory" defaultValue={userSelectedParameters?.sexCategory}>
                            {["M", "F"].map((item, index) => {
                                const isSelected = item === userSelectedParameters?.sexCategory
                                return (
                                    <option
                                        key={index}
                                        value={item}
                                    >{item} {isSelected && "(Current)"}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div>COLOR OPTIONS:
                        <label htmlFor="colorSelector"></label>
                        <select className="colorSelector" name="color" defaultValue={userSelectedParameters?.color} onChange={handleColorChange}>
                            {details.colorOptions.map((item, index) => {
                                const isSelected = item === userSelectedParameters?.color
                                return (
                                    <option
                                        key={index}
                                        value={item}
                                    >{item} {isSelected && "(Current)"}</option>
                                )
                            }
                            )}
                        </select>
                    </div>
                    <div>Quantity:
                        <select className="quantitySelector" name="quantity" defaultValue={amount}>
                            {
                                Array.from(Array(20)).map((x, index) => <option key={index} value={index + 1}>{index + 1} {amount === (index + 1) && "(Current)"}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className="addToCartForm--right">
                    <ColorSelector colorArray={details.colorOptions} defaultValue={userSelectedParameters?.color}/>
                </div>
                <button className="submitProductButton">{ modal ? "Submit Edited Item" : "Add To Cart" }</button>
            </form>
        </div>
    )
}
