import React from "react"

export default function Search(){
    const [searchVal, setSearchVal] = React.useState("")
    const [dummyDB, setDummyDB] = React.useState(["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"])
    const [searchResults, setSearchResults] = React.useState([])
    function handleChange(e){
        setSearchVal(e.target.value)
    }

    function findItemInDummyDB(phrase){
        setSearchResults(
            dummyDB.filter(item => {
                const regex = new RegExp(phrase, 'gi');
                return item.match(regex)
            })
        )
    }

    React.useEffect(()=>{
        if(searchVal === ""){
            setSearchResults([])
        }else{
            findItemInDummyDB(searchVal)
        }
            
    }, [searchVal])

    let resultsAsHTML = searchResults.map((x, index) => <li key={index}>{x}</li>)

    return(
        <>
                <input type="text" value={searchVal} onChange={handleChange}></input>

                <ul id="searchResults">{resultsAsHTML}</ul>
        </>

    )
}