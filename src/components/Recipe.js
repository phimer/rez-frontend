import React from 'react';
import FullRecipe from './FullRecipe';
import { useState } from 'react';
import Button from './Button'
import UpdateRecipe from './UpdateRecipe'

const Recipe = ({ recipe, onToggle, onDelete, onUpdate }) => {


    const [showFullRecipe, setShowFullRecipe] = useState(false)
    const [showUpdateRecipe, setShowUpdateRecipe] = useState(false)

    const fetchRecipeAndShowFullRecipe = async (id) => {
        onToggle(id)
        setShowFullRecipe(!showFullRecipe)

    }

    const replaceCommasWithSpaces = (text) => {
        return text.replaceAll(',', '\n');

    }

    return (
        <div className={'recipe'}>
            <div onClick={() => fetchRecipeAndShowFullRecipe(recipe.id)}
            // onDoubleClick={() => onToggle(recipe.id)}
            >
                <table className='recipes-table'>
                    <tbody>
                        <tr>
                            <td id="recipe-name">{recipe.name}</td>
                            <td>{`${recipe.time} Minuten`}</td>
                            <td>{replaceCommasWithSpaces(recipe.category)}</td>
                        </tr>
                    </tbody>
                </table>


                {showFullRecipe && <FullRecipe recipe={recipe} />}


            </div>
            {showFullRecipe && <Button className={'recipe-button'} color={'blue'} text={!showUpdateRecipe ? 'Update Recipe' : 'Close'} onClick={() => setShowUpdateRecipe(!showUpdateRecipe)}></Button>}
            {showUpdateRecipe && <UpdateRecipe onUpdate={onUpdate} recipe={recipe} setShowUpdateRecipe={setShowUpdateRecipe} />}
            {showFullRecipe && <Button className={'recipe-button'} color={'red'} text={'Delete Recipe'} onClick={() => onDelete(recipe.id)}></Button>}
        </div>
    );
};

export default Recipe;


//<h3>{recipe.name}
//{/* <FaTimes style={{ color: 'red', cursor: 'pointer' }}
//    onClick={() => onDelete(recipe.id)} /> */}
//</h3>

