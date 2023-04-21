import React from "react"

export default function ColorSelector ({ colorArray, defaultValue }) {
    const [activeColor, setActiveColor] = React.useState(null)
    const colorsAsHTML = colorArray.map((item, index) => {
        return (
            <div
                name="color"
                key={index}
                className={`colorInput ${defaultValue === item && "colorInput--active"}`}
                style={{ backgroundColor: item }}
                onClick={(e) => { testing(e, item) }}
                value={item}
            ></div>
        )
    })

    function testing (e, item) {
        setActiveColor(item)
        const old = document.querySelector(".colorInput--active")
        if (old !== undefined && old !== null) {
            old.classList.remove("colorInput--active")
        }
        e.target.classList.add("colorInput--active")
    }

    React.useEffect(() => {
        if (activeColor !== null) {
            document.querySelector(".colorSelector").value = activeColor
        }
    }, [activeColor])

    return (
        <div id="colorSelectorContainer" >
            {colorsAsHTML}
        </div>
    )
}
