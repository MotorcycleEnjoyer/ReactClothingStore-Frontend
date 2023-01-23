export default function Login(){
    function handleSubmit(){

    }
    return(
        <>
            <h1>Please enter your credentials</h1>
            <form>
                <input type="text" name="username" placeholder='Username' required></input>
                <input type="password" name="password" placeholder='Password' required></input>
                <button onClick={handleSubmit}></button>
            </form>
        </>
    )
}