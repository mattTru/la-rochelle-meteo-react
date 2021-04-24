import React from 'react'

import PropTypes from 'prop-types'

import arrow from './Compass.png'

// direction map
const directionMap = {
    N: 0,
    E: 90,
    O: -90,
    S: 180,
    NE: 45,
    NO: -45,
    SE: 135,
    SO: -135
}

// composant compass
const Compass = ({ direction }) => <div style={{
    border: '1px solid lightgray',
    height: '6rem',
    width: '6rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}}>
    <img src={arrow} alt="Compass arrow"
        style={{
            height: '4rem',
            // rotation of the wind arrow
            transform: `rotate(${directionMap[direction]}deg`
        }}
    />
</div>

// we declare the proptypes
Compass.propTypes = {
    direction: PropTypes.oneOf([
        'N', 'E', 'O', 'S',
        'NO', 'NE', 'SO', 'SE'
    ])
}

export default Compass