import React from 'react';
import FullRecipe from './FullRecipe';
import { useState } from 'react';
import Button from './Button'
import UpdateRecipe from './UpdateRecipe'

const Recipe = ({ recipe, onToggle, onDelete, onUpdate, errorMessage }) => {


    const [showFullRecipe, setShowFullRecipe] = useState(false)
    const [showUpdateRecipe, setShowUpdateRecipe] = useState(false)
    const [confirmDeleteCheck, setConfirmDeleteCheck] = useState(false)
    const [fullRecipe, setFullRecipe] = useState({})

    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const fetchRecipeAndShowFullRecipe = async (id) => {

        //the function gets called when the full recipe is opened and when it is closed - don't want to fetch the full recipe when closing
        if (!showFullRecipe) {

            setShowFullRecipe(!showFullRecipe)
            setLoadingSpinner(true)
            setFullRecipe(await onToggle(id)) //on toggle fetches full recipe -> await response and set it to full recipe
            setLoadingSpinner(false)
        } else {
            setShowFullRecipe(!showFullRecipe)
        }
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


                {showFullRecipe && <FullRecipe recipe={fullRecipe} loadingSpinner={loadingSpinner} />}




            </div>

            {showFullRecipe && <div id='delte-and-edit-buttons'>

                {/* error message */}
                {(errorMessage !== '' && recipe.id === errorMessage.id) && <h4 className="recipe-error-message">{errorMessage.message}</h4>}

                {/* update button */}
                {<Button className={'recipe-btn'} color={!showUpdateRecipe ? 'blue' : '#C67979'}
                    text={!showUpdateRecipe ? 'Update Recipe' : 'Close'}
                    onClick={() => setShowUpdateRecipe(!showUpdateRecipe)}></Button>}

                {/* update recipe component */}
                {showUpdateRecipe && <UpdateRecipe onUpdate={onUpdate} recipe={fullRecipe}
                    setShowUpdateRecipe={setShowUpdateRecipe} />}

                {/* delete confirm? message */}
                {(confirmDeleteCheck) && <h4 className="recipe-error-message">{'Are you sure you want to delete this recipe?'}</h4>}

                {/* delete button */}
                {(!showUpdateRecipe) && <Button className={'recipe-btn'}
                    color={!confirmDeleteCheck ? 'red' : '#C67979'} text={!confirmDeleteCheck ? 'Delete Recipe' : 'No, do not delete'}
                    onClick={() => setConfirmDeleteCheck(!confirmDeleteCheck)}></Button>}

                {/* final delete button */}
                {(!showUpdateRecipe && confirmDeleteCheck) && <Button className={'recipe-btn'}
                    color={'red'} text={confirmDeleteCheck ? 'Yes, delete' : 'Delete Recipe'}
                    onClick={() => { setConfirmDeleteCheck(false); onDelete(fullRecipe) }}></Button>}
            </div>}
        </div>
    );
};

export default Recipe;



