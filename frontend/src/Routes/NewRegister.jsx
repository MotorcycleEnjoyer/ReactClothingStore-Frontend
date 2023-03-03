import React from "react"
import { register } from "../API/apiCalls"

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
    return (
        <>
            <h1>Register account!</h1>
            <form onSubmit={handleSubmit}>
                <input id="username" name="username" placeholder="Username" required></input>
                <input id="password" name="password" placeholder="Password" required></input>
                <input id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required></input>
                <button>Submit</button>
            </form>
            <div id="message"></div>
        </>
    )
}
