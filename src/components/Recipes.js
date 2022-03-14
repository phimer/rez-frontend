import React from 'react';
import Recipe from './Recipe';
import { useState } from 'react';


const Recipes = ({ recipes, onDelete, onToggle }) => {




    return (
        <div>
            {recipes.map((recipe) => (
                <Recipe key={recipe.id} recipe={recipe} onDelete={onDelete} onToggle={onToggle} />
            ))}
        </div>
    );
};

export default Recipes;
