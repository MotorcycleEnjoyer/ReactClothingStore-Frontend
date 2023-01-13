import Search from "./Search"

export default function NavBar(){
    return(
        <nav id="navBar">
            <button>Login</button>
            <button>Register</button>
            <Search />
        </nav>
    )
}