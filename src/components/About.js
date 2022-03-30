import React from 'react'
import { Link } from 'react-router-dom'


const About = () => {
    return (
        <div className='about-div'>
            <h4>Version 2.1.0</h4>

            <h4>Contact: mertz(at)stud.fra-uas.de</h4>
            <br />
            <Link to="/">Go Back</Link>
        </div>
    )
}

export default About