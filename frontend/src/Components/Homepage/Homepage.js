import React from "react";
import CategoryButton from "../CategoryButton/CategoryButton";
import allCategories from "../CategoryButton/categories"

export default function Homepage(){
    const [categories, setCategories] = React.useState(allCategories.dummyDB)

    const categoryDataAsHtml = categories.map((item, index) => <CategoryButton key={index} name={item} />)

    return(
        <div className="categoryButtonParentContainer">
          {categoryDataAsHtml}
        </div>
    )
}