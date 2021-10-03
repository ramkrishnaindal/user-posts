import React, { forwardRef } from "react";
import classes from "./TextArea.module.css";
const textarea = forwardRef((props, ref) => {
  const classNames = `${classes.input} ${props.className}`;
  let inputConst = (
    <textarea
      style={{ ...props.style }}
      id={props.id}
      className={classNames}
      {...props}
    >
      {props.value}
    </textarea>
  );
  if (ref)
    inputConst = (
      <textarea
        style={{ ...props.style }}
        id={props.id}
        className={classNames}
        ref={ref}
        {...props}
      ></textarea>
    );
  return (
    <div
      className={classes.inputContainer}
      style={{ ...(props.inputContainerStyle || null) }}
    >
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <label htmlFor={props.id} style={{ ...props.inputContainerLabelStyle }}>
          {props.title}
        </label>
      </div>
      {inputConst}
    </div>
  );
});
export default textarea;
