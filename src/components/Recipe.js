import React from 'react';
import FullRecipe from './FullRecipe';
import { useState } from 'react';
import Button from './Button'
import UpdateRecipe from './UpdateRecipe'

const Recipe = ({ recipe, onToggle, onDelete, onUpdate, errorMessage }) => {


    const [showFullRecipe, setShowFullRecipe] = useState(false)
    const [showUpdateRecipe, setShowUpdateRecipe] = useState(false)
    const [confirmDeleteCheck, setConfirmDeleteCheck] = useState(false)

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
            <div id='delte-and-edit-buttons'>
                {(errorMessage !== '' && recipe.id === errorMessage.id) && <h4 className="recipe-error-message">{errorMessage.message}</h4>}

                {showFullRecipe && <Button className={'recipe-btn'} color={!showUpdateRecipe ? 'blue' : '#C67979'}
                    text={!showUpdateRecipe ? 'Update Recipe' : 'Close'} onClick={() => setShowUpdateRecipe(!showUpdateRecipe)}></Button>}

                {showUpdateRecipe && <UpdateRecipe onUpdate={onUpdate} recipe={recipe} setShowUpdateRecipe={setShowUpdateRecipe} />}

                {(confirmDeleteCheck) && <h4 className="recipe-error-message">{'Are you sure you want to delete this recipe?'}</h4>}
                {(showFullRecipe && !showUpdateRecipe) && <Button className={'recipe-btn'} color={!confirmDeleteCheck ? 'red' : '#C67979'} text={!confirmDeleteCheck ? 'Delete Recipe' : 'No, do not delete'} onClick={() => setConfirmDeleteCheck(!confirmDeleteCheck)}></Button>}
                {(showFullRecipe && !showUpdateRecipe && confirmDeleteCheck) && <Button className={'recipe-btn'} color={'red'} text={confirmDeleteCheck ? 'Yes, delete' : 'Delete Recipe'} onClick={() => { setConfirmDeleteCheck(false); onDelete(recipe) }}></Button>}
            </div>
        </div>
    );
};

export default Recipe;



