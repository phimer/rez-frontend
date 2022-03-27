import React from 'react';
import Recipe from './Recipe';


const Recipes = ({ recipes, onToggle, onDelete, onUpdate, errorMessage }) => {




    return (
        <div>
            {recipes.map((recipe) => (
                <Recipe key={recipe.id} recipe={recipe} onDelete={onDelete} onToggle={onToggle} onUpdate={onUpdate} errorMessage={errorMessage} />
            ))}
        </div>
    );
};

export default Recipes;
