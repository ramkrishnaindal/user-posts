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
                color: "red",
                fontWeight: "bold",
                padding: "5px",
                backgroundColor: "rgb(226, 244, 245)",
                width: "100%",
              }}
            >
              Some error occurred
            </h1>
          }
          actions={<Button title="Close" onClick={props.onClose} style={{fontWeight:"bold"}}/>}
          headerStyle={{ border: "2px solid red" }}
          bodyStyle={{ color: "red", border: "1px solid red" }}
          onClose={props.onClose}
        >
          <p>{error.message.replace(/Firebase:/g, '')}</p>
        </Modal>
      </>
    ):null
  )
}

export default ErrorModal;