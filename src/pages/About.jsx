import React from 'react'
import Home from './Home'
import Courses from './Courses'
import Team from './Team'
import Services from './Services'
import Testimonial from './Testimonial'

const About = () => {
    return (
        <div className='container'>
            <div class="row g-0 text-center">

                <div class="col-sm-6 col-md-12"> <Services /></div>

                <div class="col-sm-6 col-md-12"><Team /></div>

                <div class="col-sm-6 col-md-12"><Testimonial /></div>

            </div>




        </div>
    )
}

export default About