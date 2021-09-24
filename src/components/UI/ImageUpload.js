import React, { useState,useRef,useEffect } from "react";
import Button from "./Button";
import classes from "./ImageUpload.module.css";

const ImageUpload = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  
  const reader = new FileReader();
  
    reader.addEventListener("load", function () {
        // convert image file to base64 string
        setImageUrl(reader.result);
      }, false);
    
  
  const fileInputRef= useRef();
  

  const fileOnChangeHandler=(e) =>{
    if(e.target.files[0]){
        props.onFileReceived(e.target.files[0]);
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    }
  }
  return (
    <div>
      <div className={classes["image-container"]}>
        {imageUrl &&<img src={imageUrl} alt={props.imageTitle} title={props.imageTitle} className={classes.image} />}
      </div>
      <input type="file" accept=".png,.jpeg,.jpg,.bmp" style={{display:"none"}} ref ={fileInputRef} onChange={fileOnChangeHandler}/>
      <div className={classes["button-container"]}>
          <label >{props.imageTitle}</label>
          <Button title="Upload" onClick={()=>fileInputRef.current.click()} type="button"/>
      </div>
    </div>
  );
};

export default ImageUpload;
