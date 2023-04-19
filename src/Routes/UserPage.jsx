import React from "react"
import { LoginContext } from "../Contexts/ShoppingContext"
import { Link, Outlet } from "react-router-dom"
import { getUserDetails } from "../API/apiCalls"

export default function UserPage () {
    const [data, setData] = React.useState(null)
    const loggedIn = React.useContext(LoginContext)
    const [timer, setTimer] = React.useState(5)

    React.useEffect(() => {
        async function getDetails () {
            const userDetails = await getUserDetails()
            setData(() => userDetails)
        }
        if (loggedIn) {
            getDetails()
        }
    }, [])

    function loginPlease () {
        setInterval(() => {
            setTimer(() => timer - 1)
        }, 1000)
        setTimeout(() => {
            window.location.href = "/"
        }, 6000)
    }

    return (
        <>
            {
                !loggedIn &&
                <>
                    {loginPlease()}
                    <div style={{ backgroundColor: "orange", padding: "2rem", border: "1px solid black", height: "100rem" }}>
                        <h1>You must be logged in to access this page.</h1>
                        <h2>{`Redirecting to homepage automatically in ${timer}`}</h2>
                    </div>
                </>
            }
            {
                loggedIn && <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
                    <div style={{ flex: "1", display: "flex", flexDirection: "column", maxWidth: "15rem", backgroundColor: "black", color: "white", border: "5px solid orange" }}>
                        <h1>Welcome {data?.username || "[...]"}</h1>
                        <Link reloadDocument to="/" className="homeLogo">HOME</Link>
                        <Link to="/userpage/orderHistory" className="homeLogo">Order History</Link>
                        <Link to="/userPage/resetPassword" className="homeLogo">Change Password</Link>
                        <Link to="/userPage/ratingAndReviewHistory" className="homeLogo">Review/Rating History</Link>
                        <div className="homeLogo">Welcome {data?.username || "[...]"}</div>
                    </div>
                    <div style={{ flex: "1", backgroundColor: "#a52a2a" }}>
                        <Outlet />
                    </div>
                </div>
            }
        </>
    )
}
