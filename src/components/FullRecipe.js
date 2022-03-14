import React from 'react'

const FullRecipe = ({ recipe }) => {
    return (
        <div>
            <h1>{recipe.name}</h1>
            <h4>{recipe.category}</h4>
            <h4>{recipe.time}</h4>
            <br />

            <p>{recipe.ingredients}</p>
            <p>{recipe.preparation}</p>




        </div>
    )
}

export default FullRecipe