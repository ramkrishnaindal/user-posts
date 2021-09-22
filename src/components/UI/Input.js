import React from 'react'
import classes from './Input.module.css'
const Input = (props) => {
    const classNames=`${classes.input} ${props.className}`;
    let inputConst=<input style={{...props.style}} id ={props.id} className={classNames} value={props.value} name={props.name} onChange={props.onChange} {...props}/>;
    if(props.isRef)
        inputConst=<input style={{...props.style}} id ={props.id} className={classNames}  name={props.name} ref={props.inputRef} {...props}/>;
    return (
        <div className={classes.inputContainer}>
        <div style={{display:'flex',justifyContent:"flex-end",flex:1}}>
        <label htmlFor={props.id} >{props.title}</label>
        </div>
        {inputConst}
        </div>
    )
}

export default Input
