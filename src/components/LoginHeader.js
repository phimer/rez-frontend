import React from 'react'
import Button from './Button'

const LoginHeader = ({ onLoginClick, showLogin, userLoggedIn, onLogout, currentUser }) => {
    return (
        <div id="login-header">
            {!userLoggedIn && <div id='login-div'>
                {<Button className='login-btn' color={showLogin ? '#C67979' : '#86C679'} text={showLogin ? 'Close' : 'Login'} onClick={onLoginClick} />}
            </div>}

            {userLoggedIn && <div id='logout-div'>
                {<h4 id='user-greeting'>Hello, {currentUser}</h4>}

                {<Button className='login-btn logout-btn' color={'#A8EEEA'} text={'Logout'} onClick={onLogout} />}
            </div>}
        </div>
    )
}

export default LoginHeader