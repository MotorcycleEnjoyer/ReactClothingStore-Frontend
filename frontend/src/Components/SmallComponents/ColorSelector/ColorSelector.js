import React from "react"

export default function ColorSelector({colorArray, colorOverride}){
    const [activeColor, setActiveColor] = React.useState(null)
    const [colorsAsHTML, setColorsAsHTML] = React.useState(colorArray.map((item, index) => {
        return (
        <div 
            name="color" 
            key={index} 
            className="colorInput"
            style={{backgroundColor: item}}
            onClick={(e)=>{testing(e, item)}}
            value={item}
        ></div>
        )
    }))

    function testing(e, item){
        setActiveColor(item)
        let old = document.querySelector(".colorInput--active")
        if(old !== undefined && old !== null){
            old.classList.remove("colorInput--active")
        }
        e.target.classList.add("colorInput--active")
    }
 

    return(
        <div style={{minWidth: "200px", display:"flex"}}>
            {colorsAsHTML}
        </div>
    )
}