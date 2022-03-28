
//rafce

import PropTypes from 'prop-types'
import Button from './Button'
import React from 'react';
import { useLocation } from 'react-router-dom'



const Header = ({ title, onAdd, showAdd }) => {

    const location = useLocation()


    return (
        <div className='header-box'>
            <div className='header'>

                <h1 className="title">{title}</h1>
                {
                    location.pathname === '/' && (
                        <Button className={'add-new-recipe-btn'} color={showAdd ? '#C67979' : '#86C679'} text={showAdd ? 'Close' : 'Add new Recipe'} onClick={onAdd} />)
                }
            </div >


        </div >


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
