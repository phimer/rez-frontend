import React from 'react'

const FullRecipe = ({ recipe }) => {


    return (
        <div className="full-recipe">
            <hr id="upper-hr" />
            <h4 className="full-recipe-headings">Zutaten:</h4>
            <div className="full-recipe-paragraphs" id="ingredients">{recipe.ingredients}</div>
            <hr />
            <h4 className="full-recipe-headings" id="preparation-heading">Zubereitung:</h4>
            <div className="full-recipe-paragraphs" id="preparation">{recipe.preparation}</div>





        </div>
    )
}

export default FullRecipe