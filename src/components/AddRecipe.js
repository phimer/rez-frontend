import React from 'react'
import { useState } from 'react'

const AddRecipe = ({ onAdd }) => {

    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [preparation, setPreparation] = useState('')
    const [category, setCategory] = useState('')


    const countLinesInText = (text) => {


        let count = 0;

        for (let char of text) {
            if (char === '\n') {
                count++;
            }
        }

        return count + 2;
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

            <input type='submit' value='Rezept hinzufügen' className='btn btn-block' />
        </form>
    )
}

export default AddRecipe