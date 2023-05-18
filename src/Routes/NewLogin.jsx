import React from "react"
import { login } from "../API/apiCalls"
import { LoginContext } from "../Contexts/ShoppingContext"
import { Form } from "react-router-dom"

export async function action ({ request }) {
    const formData = await request.formData()
    const credentials = Object.fromEntries(formData)
    const result = await login(credentials)
    if (result === 200) {
        window.location.href = "/"
    } else {
        document.querySelector(".serverResponse").innerText = "Failed to login."
    }
}

export default function Login () {
    const isLoggedIn = React.useContext(LoginContext)
    if (isLoggedIn) {
        window.location.href = "/"
    }

    return (
        <> {!isLoggedIn &&
            <div className="auth">
                <h1>Please enter your credentials</h1>
                <Form
                    method="post"
                    replace
                >
                    <div className="credentialBox">
                        <input type="text" id="username" name="username" placeholder='Username' required maxLength="30" autoFocus></input>
                        <input type="password" id="password" name="password" placeholder='Password' required maxLength="30"></input>
                    </div>
                    <button>Submit</button>
                </Form>
                <div className="serverResponse"></div>
            </div>
        }
        </>
    )
}
