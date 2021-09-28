import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Card from "./UI/Card";
import classes from "./SignupComponent.module.css";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { useDispatch } from "react-redux";
import AppContext from "../context/app-context";
import ImageUpload from "./UI/ImageUpload";
import {storeActions} from '../store/store'
import {
  uploadPicture,
  addProfileData,
  updateProfileData,
} from "../shared/firebase";

const SignUpComponent = () => {
  const dispatch=useDispatch();
  const [email, setEmail] = useState("");
  const [file, setFile] = useState();
  
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  const ctx = useContext(AppContext);
  const onFileReceivedHandler = (file) => {
    setFile(file);
  };
  const submitHandler = async (event) => {
    debugger;
    event.preventDefault();
    let user;
    try {
      user = await ctx.signUp(email, password);
    } catch (error) {
      alert("signup")
      ctx.callSetError(error);
      return;
    }
    try {
      await addProfileData(user.uid, { name });
      if(!file)
        dispatch(storeActions.addUser({id:user.uid,  name,profileImageUrl:null }))
        if (user) history.replace("/");
    } catch (error) {
      alert("addpropfile")
      ctx.callSetError(error);
      if (user) history.replace("/");
      return;
    }
    let profileImageUrl;
    try {
      profileImageUrl = await uploadPicture(file, `${user.uid}/images`);
      dispatch(storeActions.addUser({id:user.uid,  name,profileImageUrl }))
      // setImageUrl(profileImageUrl);
      if (user) history.replace("/");
    } catch (error) {
      alert("profile")
      ctx.callSetError(error);
      if (user) history.replace("/");
      return;
    }
    if (profileImageUrl) {
      try {
        await updateProfileData(user.uid, { profileImageUrl });
        if (user) history.replace("/");
      } catch (error) {
        alert()
        ctx.callSetError(error);
        if (user) history.replace("/");
      }
    }
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div className={classes.content}>
      <Card className={classes.title}>
        <h1> Sign Up</h1>
      </Card>
      <div className={classes.parentContainer}>
        <Card className={classes.container} style={{ paddingBottom: "20px" }}>
          <form onSubmit={submitHandler}>
            <div className={classes.inputContainer}>
              <Input
                id="name"
                type="name"
                placeholder="Name"
                onChange={nameChangeHandler}
                value={name}
                title="Name"
                inputContainerLabelStyle={{paddingTop:"10px"}}
                required
              />
            </div>
            <div className={classes.inputContainer}>
              <Input
                id="email"
                type="email"
                placeholder="E Mail"
                onChange={emailChangeHandler}
                value={email}
                title="E Mail"
                inputContainerLabelStyle={{paddingTop:"10px"}}
                required
              />
            </div>
            <div className={classes.inputContainer}>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                onChange={passwordChangeHandler}
                value={password}
                title="Password"
                required
              />
            </div>
            <div className={classes.imageContainer}>
              <ImageUpload
                imageTitle="Profile image"
                onFileReceived={onFileReceivedHandler}
              />
            </div>
            <div className={classes.actions}>
              <Button
                title="Sign up"
                onClick={() => {}}
                style={{ marginRight: "10px" }}
              />
              <Button
                title="Cancel"
                onClick={() => {
                  ctx.clearError();
                  history.replace("/");
                }}
                style={{ marginRight: "10px" }}
              />
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignUpComponent;
