import React from "react"
import { Link } from "react-router-dom"

export default function NewHomePage () {
    return (
        <div className="homePageContainer">
            <div className="categoryButtonContainer">
                <Link className="categoryButton" to="/s/Shirt">Shirts</Link>
                <Link className="categoryButton" to="/s/Short">Shorts</Link>
                <Link className="categoryButton" to="/s/Shirt">Shirts</Link>
            </div>
            <div className="bestsellerContainer">
                <h1 className="bestsellerContainer--title">Best Sellers</h1>
                <div className="popularItemsContainer">
                    <Link to={"/p/Generic+T+Shirt/id/0"} className="popularItem">
                        <div className="popularItem--image" style={{ backgroundImage: "url('/backend/productImages/t-shirt-preview.png')" }}></div>
                        <div className="popularItem--details">
                            <h1>Generic T Shirt</h1>
                            <p>⭐⭐⭐⭐⭐</p>
                        </div>
                    </Link>
                    <Link to={"/p/Generic+T+Shirt/id/0"} className="popularItem">
                        <div className="popularItem--image" style={{ backgroundImage: "url('/backend/productImages/t-shirt-preview.png')" }}></div>
                        <div className="popularItem--details">
                            <h1>Specific T Shirt</h1>
                            <p>⭐⭐⭐⭐</p>
                        </div>
                    </Link>
                    <Link to={"/p/Generic+T+Shirt/id/0"} className="popularItem">
                        <div className="popularItem--image" style={{ backgroundImage: "url('/backend/productImages/t-shirt-preview.png')" }}></div>
                        <div className="popularItem--details">
                            <h1>T Shirt 3</h1>
                            <p>⭐⭐⭐</p>
                        </div>
                    </Link>
                    <Link to={"/p/Generic+T+Shirt/id/0"} className="popularItem">
                        <div className="popularItem--image" style={{ backgroundImage: "url('/backend/productImages/t-shirt-preview.png')" }}></div>
                        <div className="popularItem--details">
                            <h1>Generic T Shirt</h1>
                            <p>⭐⭐⭐⭐⭐</p>
                        </div>
                    </Link>
                    <Link to={"/p/Generic+T+Shirt/id/0"} className="popularItem">
                        <div className="popularItem--image" style={{ backgroundImage: "url('/backend/productImages/t-shirt-preview.png')" }}></div>
                        <div className="popularItem--details">
                            <h1>Specific T Shirt</h1>
                            <p>⭐⭐⭐⭐</p>
                        </div>
                    </Link>
                    <Link to={"/p/Generic+T+Shirt/id/0"} className="popularItem">
                        <div className="popularItem--image" style={{ backgroundImage: "url('/backend/productImages/EmiyaKiritsugu.jpg')" }}></div>
                        <div className="popularItem--details">
                            <h1>T Shirt 3</h1>
                            <p>⭐⭐⭐</p>
                        </div>
                    </Link>
                    <Link to={"/s/Shirt"} style={{ backgroundColor: "#808080", color: "white" }} className="popularItem">
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} className="popularItem--details">
                            <h1 style={{ margin: "none" }}>More</h1>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
