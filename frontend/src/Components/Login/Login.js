export default function Login({...props}){
    return(
        <div className="mainContainer">
          <h1>Please enter your credentials</h1>
          <input type="text" name="username" placeholder='Username'></input>
          <input type="password" name="password" placeholder='Password'></input>
          <button onClick={()=> props.changeView}>SEARCH</button>
        </div>
    )
}