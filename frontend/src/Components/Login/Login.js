import axios from "axios"

const LOGIN_ENDPOINT = "http://localhost:5000/login"
const FAILURE_STRING = "Incorrect credentials. Please try again"
const HOMEPAGE = "/"

export default function Login(){
    function handleSubmit(e){
        e.preventDefault()
        let credentials = {}
        credentials["username"] = document.querySelector("#username").value
        credentials["password"] = document.querySelector("#password").value
        axios.post(LOGIN_ENDPOINT, credentials, {withCredentials: true})
            .then((response)=>
            {
                console.log(response)
                if(response.data === FAILURE_STRING){
                    document.querySelector(".serverResponse").innerText = FAILURE_STRING
                }
                else{
                    window.location = HOMEPAGE
                }
            })
            .catch((error)=> console.log(error))
    }
    return(
        <>
            <h1>Please enter your credentials</h1>
            <form>
                <input type="text" id="username" name="username" placeholder='Username' required></input>
                <input type="password" id="password" name="password" placeholder='Password' required></input>
                <button onClick={handleSubmit}>Submit</button>
            </form>
            <div className="serverResponse"></div>
        </>
    )
}