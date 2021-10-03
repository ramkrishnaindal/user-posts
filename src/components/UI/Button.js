import React from 'react'
import { Link } from 'react-router-dom';
import classes from './Button.module.css'

const Button = (props) => {
    const classBtn=`${props.className?props.className:''} ${classes.btn}`
    debugger
    let btn=<button className={`${props.className?props.className:''} ${classes.btn}`} onClick={props.onClick} style={{...props.style}} {...props}>{props.title}</button>;
    if(props.isLink)
        btn=<Link to={props.to}  className={`${props.className?props.className:''} ${classes.btn}`} style={{...props.style}} {...props}>
            {props.title}
        </Link>
    return (
        btn
    )
}

export default Button
