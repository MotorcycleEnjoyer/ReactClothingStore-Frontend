import axios from "axios"
import React from "react"

const REGISTER_ENDPOINT = "http://localhost:5000/register"
const SUCCESS_MESSAGE = "Registered Successfully!"
const NAME_COLLISION = "Name is taken!"

export default function Register(){
    function handleSubmit(e){
        e.preventDefault()

        let password = document.querySelector("#password").value
        let confirmPassword = document.querySelector("#confirmPassword").value
        if(password === confirmPassword)
        {
            const credentials = {}
            credentials["username"] = document.querySelector("#username").value
            credentials["password"] = password
            axios.post(REGISTER_ENDPOINT, credentials, {withCredentials: true})
            .then(response => {
                if(response.data === SUCCESS_MESSAGE)
                {
                    window.location = "/"
                }
                if(response.data === NAME_COLLISION){
                    document.querySelector("#passwordMismatch").innerText = NAME_COLLISION                
                }
            })
            .catch(error => {
                console.error(error)
            })
        }else{
            document.querySelector("#message").innerText = "Passwords do not match"
        }
    }

    return(
        <>
            <h1>Register account!</h1>
            <form>
                <input id="username" name="username" placeholder="Username" required></input>
                <input id="password" name="password" placeholder="Password" required></input>
                <input id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required></input>
                <button onClick={handleSubmit}>Submit</button>
            </form>
            <div id="message"></div>
        </>
    )
}