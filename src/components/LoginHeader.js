import React from 'react'
import Button from './Button'

const LoginHeader = ({ onLoginClick, showLogin, userLoggedIn, onLogout, currentUser }) => {
    return (
        <div id='login-header'>

            {userLoggedIn && <h4 id='user-greeting'>Hello, {currentUser}</h4>}
            {
                !userLoggedIn && (
                    <Button className='login-btn' color={showLogin ? '#C67979' : '#86C679'} text={showLogin ? 'Close' : 'Login'} onClick={onLoginClick} />)
            }

            {
                userLoggedIn && (
                    <Button className='login-btn' color={'#C67979'} text={'Logout'} onClick={onLogout} />)
            }
        </div>
    )
}

export default LoginHeader