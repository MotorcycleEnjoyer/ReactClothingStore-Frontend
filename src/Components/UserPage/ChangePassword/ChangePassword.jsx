import React from "react"
import { Form } from "react-router-dom"
import { changePassword } from "../../../API/apiCalls"

export async function action ({ request }) {
    const formData = await request.formData()
    const credentials = Object.fromEntries(formData)
    const response = await changePassword(credentials)
    if (response === 200) {
        const conf = confirm("Password change success! Click OK to go to homepage.")
        if (conf) {
            window.location = "/"
        }
    } else {
        alert("Password change failure!")
    }
}

export default function ChangePassword () {
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
        <div className="auth">
            <h1>Change Password</h1>
            <Form
                method="post"
                className="changePassword"
            >
                <div className="credentialBox">
                    <input style={ passwordStyle.pw } type="password" id="password" onChange={handlePwChange} name="password" placeholder="Password" value={password} required maxLength="30"></input>
                    <input style={ passwordStyle.cpw } type="password" id="confirmPassword" onChange={handleConfirmPwChange} name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" required maxLength="30"></input>
                </div>

                {
                    (password === confirmPassword && confirmPassword.length >= 8) &&
                    <button>Submit</button>
                }
            </Form>
        </div>
    )
}
