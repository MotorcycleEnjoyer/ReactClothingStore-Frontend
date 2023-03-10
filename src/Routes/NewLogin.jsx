import React from "react"
import { login } from "../API/apiCalls"

async function handleSubmit (e) {
    e.preventDefault()
    const rawFormData = new FormData(e.target)
    const credentials = Object.fromEntries(rawFormData)
    const result = await login(credentials)
    if (result?.status === 401) {
        document.querySelector(".serverResponse").innerText = result.data
    }
}

export default function Login () {
    return (
        <>
            <h1>Please enter your credentials</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" id="username" name="username" placeholder='Username' required maxLength="30"></input>
                <input type="password" id="password" name="password" placeholder='Password' required maxLength="30"></input>
                <button>Submit</button>
            </form>
            <div className="serverResponse"></div>
        </>
    )
}
