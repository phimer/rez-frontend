import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <Link id="footer-link" to='/about'>&copy; Philip Mertz 2021</Link>
        </footer>
    )
}

export default Footer