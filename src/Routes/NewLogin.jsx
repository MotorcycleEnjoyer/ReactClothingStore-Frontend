import React from "react"
import { login } from "../API/apiCalls"
import { LoginContext } from "../Contexts/ShoppingContext"

export default function Login () {
    async function handleSubmit (e) {
        e.preventDefault()
        const rawFormData = new FormData(e.target)
        const credentials = Object.fromEntries(rawFormData)
        const result = await login(credentials)
        if (result?.status === 401) {
            document.querySelector(".serverResponse").innerText = result.data
        }
    }

    const isLoggedIn = React.useContext(LoginContext)
    React.useEffect(() => {
        if (isLoggedIn) {
            window.location.href = "/"
        }
    }, [])

    return (
        <>
            { !isLoggedIn &&
                <div className="auth">
                    <h1>Please enter your credentials</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="credentialBox">
                            <input type="text" id="username" name="username" placeholder='Username' required maxLength="30" autoFocus></input>
                            <input type="password" id="password" name="password" placeholder='Password' required maxLength="30"></input>
                        </div>
                        <button>Submit</button>
                    </form>
                    <div className="serverResponse"></div>
                </div>
            }
        </>
    )
}
