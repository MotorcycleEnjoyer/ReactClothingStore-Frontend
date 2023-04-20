import React from "react"
import { Link } from "react-router-dom"
import shirt from "../t-shirt-preview.png"

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
                        <div className="popularItem--image" style={{ backgroundImage: `url(${shirt})` }}></div>
                        <div className="popularItem--details">
                            <h1>Generic T Shirt</h1>
                            <p>No.1 item purchased</p>
                            <p>⭐⭐⭐⭐⭐</p>
                        </div>
                    </Link>
                    <Link to={"/p/Generic+T+Shirt/id/0"} className="popularItem">
                        <div className="popularItem--image" style={{ backgroundImage: `url(${shirt})` }}></div>
                        <div className="popularItem--details">
                            <h1>Specific T Shirt</h1>
                            <p>No.2 item purchased</p>
                            <p>⭐⭐⭐⭐</p>
                        </div>
                    </Link>
                    <Link to={"/p/Generic+T+Shirt/id/0"} className="popularItem">
                        <div className="popularItem--image" style={{ backgroundImage: `url(${shirt})` }}></div>
                        <div className="popularItem--details">
                            <h1>T Shirt 3</h1>
                            <p>No.3 item purchased</p>
                            <p>⭐⭐⭐</p>
                        </div>
                    </Link>
                    <Link to={"/p/Generic+T+Shirt/id/0"} className="popularItem">
                        <div className="popularItem--image" style={{ backgroundImage: `url(${shirt})` }}></div>
                        <div className="popularItem--details">
                            <h1>T Shirt 3</h1>
                            <p>No.3 item purchased</p>
                            <p>⭐⭐⭐</p>
                        </div>
                    </Link>
                    <Link to={"/p/Generic+T+Shirt/id/0"} className="popularItem">
                        <div className="popularItem--image" style={{ backgroundImage: `url(${shirt})` }}></div>
                        <div className="popularItem--details">
                            <h1>T Shirt 3</h1>
                            <p>No.3 item purchased</p>
                            <p>⭐⭐⭐</p>
                        </div>
                    </Link>
                    <Link to={"/p/Generic+T+Shirt/id/0"} className="popularItem">
                        <div className="popularItem--image" style={{ backgroundImage: `url(${shirt})` }}></div>
                        <div className="popularItem--details">
                            <h1>T Shirt 3</h1>
                            <p>No.3 item purchased</p>
                            <p>⭐⭐⭐</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
