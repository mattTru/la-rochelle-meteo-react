import React from 'react'
import PropTypes from 'prop-types'

import './ForecastDay.css'

const ForecastDay = props => {
    const {
        imgSrc,
        condition,
        weekDay,
        day,
        maxTemperature,
        minTemperature
    } = props

    return <section className="card">
        <h2>
            {weekDay} {day}
        </h2>
        
        <div className="card__content">
            <img src={imgSrc} alt={condition} className="card__media" />
            <ul className="card__list">
                <li>{condition}</li>
                <li>Min : {minTemperature}°C / Max : {maxTemperature}°C</li>
            </ul>
        </div>
    </section>
}

ForecastDay.propTypes = {
    imgSrc: PropTypes.string,
    condition: PropTypes.string,
    weekDay: PropTypes.string,
    day: PropTypes.string,
    maxTemperature: PropTypes.number,
    minTemperature: PropTypes.number
}

export default ForecastDay