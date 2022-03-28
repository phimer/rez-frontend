import React from 'react'
import { useState } from 'react'
import Button from './Button'

const LoginForm = ({ onLogin, onCreate, message }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [showLoginButton, setShowLoginButton] = useState(true)




    const onSubmit = (e) => {
        e.preventDefault()

        // if (!text) {
        //     alert('Add more stuff')
        // }

        if (showLoginButton) {
            onLogin({ username, password })
        } else {
            onCreate({ username, password })
        }

        // setName('')
        // setTime('')
        // setIngredients('')
        // setPreparation('')
        // setCategory('')

    }


    return (
        <div className='add-form'>
            <h2 id='login-heading'>{showLoginButton ? "Login" : "Create New Account"}</h2>

            <form onSubmit={onSubmit}>

                <div className='form-control'>
                    <label>User Name</label>
                    <input type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className='form-control'>
                    <label>Password</label>
                    <input type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <p className='recipe-error-message'>{message}</p>

                {showLoginButton && <div>
                    <input type='submit' value='Login' className='btn btn-block main-btn' />
                    <button onClick={() => setShowLoginButton(!showLoginButton)}
                        value='Register New Account' className='btn btn-block secondary-btn'>Register New Account</button>
                </div>}
                {!showLoginButton && <div>
                    <input type='submit' value='Create New Account' className='btn btn-block main-btn' />
                    <button onClick={() => setShowLoginButton(!showLoginButton)}
                        value='Go back to Login' className='btn btn-block secondary-btn'>Go back to Login</button>
                </div>}
            </form>



        </div>
    )
}

export default LoginForm