import React from "react"
import { register } from "../API/apiCalls"
import { LoginContext } from "../Contexts/ShoppingContext"
import { Form, redirect } from "react-router-dom"

export async function action ({ request }) {
    const data = await request.formData()
    const credentials = Object.fromEntries(data)
    if (credentials.password === credentials.confirmPassword) {
        const response = await register(credentials)
        if (response.status === 200) {
            window.location.href = "/"
        } else {
            alert(response.data)
            return redirect("/register")
        }
    }
}

export default function Register () {
    const isLoggedIn = React.useContext(LoginContext)
    if (isLoggedIn) {
        window.location.href = "/"
    }

    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")

    function handleConfirmPwChange (e) {
        setConfirmPassword(e.target.value)
    }

    function handlePwChange (e) {
        setPassword(e.target.value)
    }

    const passwordStyle = {
        pw: {
            border: password.length >= 8 ? "5px solid green" : "5px solid black"
        },
        cpw: {
            border: confirmPassword.length >= 8 && confirmPassword === password ? "5px solid green" : "5px solid black"
        }
    }

    return (
        <>
            { !isLoggedIn &&
                <div className="auth">
                    <h1>Register account!</h1>
                    <Form
                        method="post"
                        replace
                    >
                        <div className="credentialBox">
                            <input id="username" name="username" placeholder="Username" required maxLength="30" autoFocus></input>
                            <input style={ passwordStyle.pw } type="password" id="password" onChange={handlePwChange} name="password" placeholder="Password" value={password} required maxLength="30"></input>
                            <input style={ passwordStyle.cpw } type="password" id="confirmPassword" onChange={handleConfirmPwChange} name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" required maxLength="30"></input>
                        </div>

                        {
                            (password === confirmPassword && confirmPassword.length >= 8) &&
                            <button>Submit</button>
                        }
                    </Form>
                    <div id="message"></div>
                </div>
            }
        </>

    )
}
