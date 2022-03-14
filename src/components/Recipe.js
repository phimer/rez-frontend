import React from 'react';
import FullRecipe from './FullRecipe';
import { useState } from 'react';


const Recipe = ({ recipe, onToggle }) => {


    const [showFullRecipe, setShowFullRecipe] = useState(false)

    const fetchRecipeAndShowFullRecipe = async (id) => {
        onToggle(id)
        setShowFullRecipe(!showFullRecipe)
    }

    return (
        <div className={'recipe'}
            onClick={() => fetchRecipeAndShowFullRecipe(recipe.id)}
        // onDoubleClick={() => onToggle(recipe.id)}
        >


            <table className='recipes-table'>
                <tbody>
                    <tr>
                        <td id="td-left">{recipe.name}</td>
                        <td id="td-center">{`${recipe.time} minutes`}</td>
                        <td id="td-right">{recipe.category}</td>
                    </tr>
                </tbody>
            </table>


            {showFullRecipe && <FullRecipe recipe={recipe} />}

        </div>
    );
};

export default Recipe;


//<h3>{recipe.name}
//{/* <FaTimes style={{ color: 'red', cursor: 'pointer' }}
//    onClick={() => onDelete(recipe.id)} /> */}
//</h3>

