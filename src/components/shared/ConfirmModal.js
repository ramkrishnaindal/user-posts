import React, { useContext } from "react";
import Button from "../UI/Button";
import Modal from "./Modal";
import AppContext from "../../context/app-context";
import Backdrop from "./Backdrop";
const ConfirmModal = (props) => {
    const ctx = useContext(AppContext);
    const { confirm, clearConfirm} = ctx;
    return(
        confirm && confirm.message ? (
        <>
          <Backdrop onClose={clearConfirm} />
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
                Are you Sure?
              </h1>
            }
            actions={<div><Button title={props.confirmTitle} onClick={props.onConfirm} style={{fontWeight:"bold",color:"red"}}/><Button title="Close" onClick={clearConfirm} style={{fontWeight:"bold"}}/></div>}
            bodyStyle={{ color: "red"}}
            onClose={clearConfirm}
          >
            <p style={{backgroundColor:"white",padding:"10px",borderRadius:"5px",border:"2px solid black"}}>
            {confirm.message}
            </p>
          </Modal>
        </>
      ):null
    )  
}

export default ConfirmModal
