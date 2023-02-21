import React from "react";
import CategoryButton from "../../SmallComponents/CategoryButton/CategoryButton";
import allCategories from "../../SmallComponents/CategoryButton/categories"

export default function Homepage(){
    const [categories, setCategories] = React.useState(allCategories.dummyDB)

    const categoryDataAsHtml = categories.map((item, index) => <CategoryButton key={index} name={item} />)

    return(
        <div className="categoryButtonParentContainer">
          {categoryDataAsHtml}
        </div>
    )
}