import React from "react";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={classes.container} onClick={props.onClose}>
      <div className={classes["modal-container"]} onClick={e=>e.stopPropagation()}>
        <div className={classes["modal-header"]} style={{ ...props.headerStyle}}>
          {props.header}
          {/* <h1>Modal Heading</h1> */}
        </div>
        <div style={{ ...props.bodyStyle,display:"flex",justifyContent:"center",alignItems:"center"}} className={classes["modal-body"]} >
          {props.children}
          {/* <p>          
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut odit
          aperiam consequatur nisi praesentium illum, tenetur, beatae
          perferendis eaque nam voluptatem modi earum, quidem est? Debitis quos
          quibusdam suscipit ipsam!
        </p> */}
        </div>
        <div className={classes["modal-footer"]}>
          {props.actions}

          {/* <Button title="OK"/>
      <Button title="cancel"/> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
