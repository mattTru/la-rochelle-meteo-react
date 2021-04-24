import React from 'react'
import PropTypes from 'prop-types'

const Resume = props => {
    const {
        weekDay,
        date,
        humidity,
        temperature,
        condition,
        imgSrc
    } = props

    return <section className="card">
        <h2>Météo du jour : {weekDay} {date}</h2>
        
        <div className="card__content">
            <img src={imgSrc} alt={condition} className="card__media" />

            <ul className="card__list">
                <li>
                    Conditions : {condition}
                </li>
                <li>
                    Hygrométrie : {humidity}%
                </li>
                <li>
                    Température : {temperature}°C
                </li>
            </ul>
        </div>

    </section>
}

// we declare the proptypes
Resume.propTypes = {
    cityName: PropTypes.string,
    country: PropTypes.string,
    weekDay: PropTypes.string,
    date: PropTypes.string,
    humidity: PropTypes.number,
    temperature: PropTypes.number,
    condition: PropTypes.string,
    imgSrc: PropTypes.string.isRequired
}

export default Resume
