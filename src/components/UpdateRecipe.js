import React from 'react'
import { useState } from 'react'


const UpdateRecipe = ({ onUpdate, recipe, setShowUpdateRecipe }) => {

    const [name, setName] = useState(recipe.name)
    const [time, setTime] = useState(recipe.time)
    const [ingredients, setIngredients] = useState(recipe.ingredients)
    const [preparation, setPreparation] = useState(recipe.preparation)
    const [category, setCategory] = useState(recipe.category)

    const id = recipe.id;


    const countLinesInText = (text) => {


        let count = 0;

        for (let char of text) {
            if (char === '\n') {
                count++;
            }
        }

        return count + 1;
    }




    const onSubmit = (e) => {
        e.preventDefault()

        // if (!name) {
        //     alert('Add more stuff')
        // }

        onUpdate({ id, name, time, ingredients, preparation, category })

        setShowUpdateRecipe(false)


    }

    return (
        <form className='add-form' onSubmit={onSubmit}>

            <div className='form-control'>
                <label>Rezeptname</label>
                <input type='text'
                    placeholder='Rezeptname'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className='form-control'>
                <label>Zubereitungszeit</label>
                <input type='text' placeholder='Zeit in Minuten (z.B. 30)'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </div>

            <div className='form-control'>
                <label>Zutaten</label>
                <textarea rows={countLinesInText(ingredients)} type='text' placeholder=''
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                />
            </div>

            <div className='form-control'>
                <label>Zubereitung</label>
                <textarea rows={countLinesInText(preparation)} type='text' placeholder=''
                    value={preparation}
                    onChange={(e) => setPreparation(e.target.value)}
                />
            </div>

            <div className='form-control'>
                <label>Kategorie</label>
                <input type='text' placeholder='vegan,easy'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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

            <input type='submit' value='Update' color={'blue'} className='btn btn-block submit-btn' />
        </form>
    )
}

export default UpdateRecipe

//className = { 'recipe-button'} color = { 'blue'}