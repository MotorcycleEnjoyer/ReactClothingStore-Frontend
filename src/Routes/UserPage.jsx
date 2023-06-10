import React from "react"
import { LoginContext } from "../Contexts/ShoppingContext"
import { Link, Outlet } from "react-router-dom"
import { getUserDetails } from "../API/apiCalls"
import "../Components/UserPage/UserPage.css"

export const UserDetailContext = React.createContext(null)

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
                    <div className="loginModal" >
                        <h1>You must be logged in to access this page.</h1>
                        <h2>{`Redirecting to homepage automatically in ${timer}`}</h2>
                    </div>
                </>
            }
            {
                loggedIn && <div className="userPageContainer">
                    <div className="userPageNav">
                        <h1>Welcome {data?.username || "[...]"}</h1>
                        <Link to="/" className="userPageNavButton">&larr; Back to home</Link>
                        <Link to="/userpage/orderHistory" className="userPageNavButton">Order History</Link>
                        <Link to="/userpage/resetPassword" className="userPageNavButton">Change Password</Link>
                        <Link to="/userpage/ratingAndReviewHistory" className="userPageNavButton">Review/Rating History</Link>
                    </div>
                    <div className="userPageContent">
                        <UserDetailContext.Provider value={data}>
                            <Outlet />
                        </UserDetailContext.Provider>
                    </div>
                </div>
            }
        </>
    )
}
