import React from 'react'
import { Link } from 'react-router-dom';
import classes from './Button.module.css'

const Button = (props) => {
    const classBtn=`${props.className} ${classes.btn}`
    let btn=<button className={classBtn} onClick={props.onClick} style={{...props.style}} {...props}>{props.title}</button>;
    if(props.isLink)
        btn=<Link to={props.to}  className={classBtn} style={{...props.style}} {...props}>
            {props.title}
        </Link>
    return (
        btn
    )
}

export default Button
