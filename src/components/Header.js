
//rafce

import PropTypes from 'prop-types'
import Button from './Button'
import React from 'react';
import { useLocation } from 'react-router-dom'



const Header = ({ title, setShowAdd, showAdd, setShowSearch, showSearch }) => {

    const location = useLocation()



    return (
        <div className='header-box'>
            <div className='header'>

                {
                    location.pathname === '/' && (
                        <Button className={'add-new-recipe-btn'} color={showSearch ? '#C67979' : '#86C679'}
                            text={showSearch ? 'Close' : 'Search Recipe'} onClick={() => {
                                setShowSearch(!showSearch)
                                setShowAdd(false)
                            }} />)
                }
                {
                    location.pathname === '/' && (
                        <Button className={'add-new-recipe-btn'} color={showAdd ? '#C67979' : '#86C679'}
                            text={showAdd ? 'Close' : 'Add new Recipe'} onClick={() => {
                                setShowAdd(!showAdd)
                                setShowSearch(false)
                            }} />)
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
