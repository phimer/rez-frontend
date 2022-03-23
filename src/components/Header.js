
//rafce

import PropTypes from 'prop-types'
import Button from './Button'
import React from 'react';
import { useLocation } from 'react-router-dom'



const Header = ({ title, onAdd, showAdd, onLogin, showLogin, userLoggedIn }) => {

    const location = useLocation()


    return (
        <header className='header'>
            <h1 className="title">{title}</h1>
            {/* <h1 style={{ color: 'red', backgroundColor: 'black' }}>{title}</h1>
            <h1 style={headingStyle}>{title}</h1> */}
            {
                (location.pathname === '/' && !userLoggedIn) && (
                    <Button color={showLogin ? 'green' : 'green'} text={showLogin ? 'Close' : 'Login'} onClick={onLogin} />)
            }
            {
                location.pathname === '/' && (
                    <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add new recipe'} onClick={onAdd} />)
            }
        </header >

    )

};

Header.defaultProps = {
    title: 'Recipes 2.0',
}

Header.propTypes = {
    title: PropTypes.string
}

// CSS in JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black',
// }

export default Header;
