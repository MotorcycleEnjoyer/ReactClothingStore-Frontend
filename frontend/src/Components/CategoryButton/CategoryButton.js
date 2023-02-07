export default function CategoryButton({...props}){
    const SEARCH_URL = "http://localhost:3000/s?k="

    function redirectToSearch(){
        console.log("BRUH")
        window.location = SEARCH_URL + props.name
    }

    return(
            <div className="categoryButton" onClick={redirectToSearch}>
                <h3>{props.name}</h3>
            </div>
    )
}