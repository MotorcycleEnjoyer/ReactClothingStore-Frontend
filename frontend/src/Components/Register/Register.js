import axios from "axios"
import React from "react"



const NAME_COLLISION = "POST/register: Name is taken!"

export default function Register({...props}){
    function handleSubmit(e){
        e.preventDefault()

        let password = document.querySelector("#password").value
        let confirmPassword = document.querySelector("#confirmPassword").value
        if(password === confirmPassword)
        {
            const credentials = {}
            credentials["username"] = document.querySelector("#username").value
            credentials["password"] = password
            props.register(credentials)
            
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