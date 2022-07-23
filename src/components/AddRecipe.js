import React from 'react'
import { useState } from 'react'

const AddRecipe = ({ onAdd, errorMessage, currentUser }) => {

    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [preparation, setPreparation] = useState('')
    const [category, setCategory] = useState('')

    const [timeErrorMessage, setTimeErrorMessage] = useState('')

    const countLinesInText = (text) => {


        let count = 0;

        for (let char of text) {
            if (char === '\n') {
                count++;
            }
        }

        return count + 3;
    }




    const onSubmit = (e) => {
        e.preventDefault()

        // if (!text) {
        //     alert('Add more stuff')
        // }

        onAdd({ name, time, ingredients, preparation, category })

        setName('')
        setTime('')
        setIngredients('')
        setPreparation('')
        setCategory('')

    }

    if (currentUser !== null) {



        return (
            <div>
                <form className='add-form' onSubmit={onSubmit}>

                    <div className='form-control'>
                        <label>Rezeptname</label>
                        <input type='text'
                            placeholder='Rezeptname'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className='form-control'>
                        <label>Zubereitungszeit in Minuten</label>
                        <input type='text' placeholder='Zeit in Minuten (z.B. 30)'
                            value={time}

                            onChange={(e) => {
                                setTimeErrorMessage('')
                                if (isNaN(e.nativeEvent.data)) {
                                    setTimeErrorMessage('Time has to be a number.')

                                } else {
                                    setTime(e.target.value)
                                }

                                setTimeout(() => {
                                    setTimeErrorMessage('')
                                }, 3000);
                            }}
                            required
                        />
                    </div>

                    {(timeErrorMessage !== '') && <h4 className="recipe-error-message">{timeErrorMessage}</h4>}

                    <div className='form-control'>
                        <label>Zutaten</label>
                        <textarea rows={countLinesInText(ingredients)} type='text' placeholder=''
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            required
                        />
                    </div>

                    <div className='form-control'>
                        <label>Zubereitung</label>
                        <textarea rows={countLinesInText(preparation)} type='text' placeholder=''
                            value={preparation}
                            onChange={(e) => setPreparation(e.target.value)}
                            required
                        />
                    </div>

                    <div className='form-control'>
                        <label>Kategorie</label>
                        <input type='text' placeholder='vegan,easy'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </div>
                    {/* <div className='form-control'>
                <label>Set Reminder</label>
                <input type='checkbox'
                    checked={reminder}
                    value={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)}
                />
            </div> */}
                    {(errorMessage !== '') && <h4 className="recipe-error-message">{errorMessage}</h4>}
                    <input type='submit' value='Rezept hinzufügen' className='btn btn-block recipe-btn add-recipe-btn' />
                </form>
            </div >
        )
    } else {
        return (
            <div className='recipe-error-message'>You need to be logged in to create a recipe!</div>
        )
    }
}

export default AddRecipe