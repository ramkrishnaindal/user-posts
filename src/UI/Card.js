import React from 'react'
import classes from './Card.module.css'
const Card = (props) => {
    const classCombine=`${classes.card} ${props.className?props.className:''}`;
    return (
        <div className={classCombine}>
            {props.children}
        </div>
    )
}

export default Card
