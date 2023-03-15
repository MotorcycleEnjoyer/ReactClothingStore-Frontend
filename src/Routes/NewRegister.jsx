import React from "react"
import { register } from "../API/apiCalls"
import { LoginContext } from "../Contexts/ShoppingContext"

function handleSubmit (e) {
    e.preventDefault()
    const rawFormData = new FormData(e.target)
    const credentials = Object.fromEntries(rawFormData)
    if (credentials.password === credentials.confirmPassword) {
        register(credentials)
    } else {
        document.querySelector("#message").innerText = "Password and Confirm Password do not match."
    }
}

export default function Register () {
    const isLoggedIn = React.useContext(LoginContext)
    React.useEffect(() => {
        if (isLoggedIn) {
            window.location.href = "/"
        }
    }, [])

    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")

    function handleConfirmPwChange (e) {
        setConfirmPassword(e.target.value)
    }

    function handlePwChange (e) {
        setPassword(e.target.value)
    }

    return (
        <>
            { !isLoggedIn &&
                <>
                    <h1>Register account!</h1>
                    <form onSubmit={handleSubmit}>
                        <input id="username" name="username" placeholder="Username" required maxLength="30"></input>
                        <input type="password" id="password" onChange={handlePwChange} name="password" placeholder="Password" value={password} required maxLength="30"></input>
                        <input type="password" id="confirmPassword" onChange={handleConfirmPwChange} name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" required maxLength="30"></input>
                        {
                            (password === confirmPassword && confirmPassword.length >= 8) &&
                            <button>Submit</button>
                        }
                    </form>
                    <div id="message"></div>
                </>
            }
        </>

    )
}
