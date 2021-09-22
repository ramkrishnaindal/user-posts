import React, { useContext } from "react";
import Button from "../UI/Button";
import Modal from "./Modal";
import AppContext from "../../context/app-context";
import Backdrop from "./Backdrop";

const ErrorModal = (props) => {
  const ctx = useContext(AppContext);
  const { error } = ctx;
  return(
    error && error.message ? (
      <>
        <Backdrop onClose={props.onClose} />
        <Modal
          header={
            <h1
              style={{
                color: "white",
                fontWeight: "bold",
                padding: "5px",
                width: "100%"                
              }}
            >
              Some error occurred
            </h1>
          }
          actions={<Button title="Close" onClick={props.onClose} style={{fontWeight:"bold"}}/>}
          bodyStyle={{ color: "red"}}
          onClose={props.onClose}
        >
          <p style={{backgroundColor:"white",padding:"10px",borderRadius:"5px",border:"2px solid black"}}>{error.message.replace(/Firebase:/g, '')}</p>
        </Modal>
      </>
    ):null
  )
}

export default ErrorModal;