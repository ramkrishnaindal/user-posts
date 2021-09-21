import React, { useState,useContext } from "react";
import { useHistory } from "react-router-dom";
import Card from "./UI/Card";
import classes from "./SignupComponent.module.css";
import Input from "./UI/Input";
import Button from "./UI/Button";

import AppContext from '../context/app-context';


const SignUpComponent = () => {
  const [email, setEmail] = useState("");
  const history=useHistory();
  const [password, setPassword] = useState("");
  const ctx=useContext(AppContext);
  const submitHandler = async (event) => {
    event.preventDefault();
    
    ctx.signUp(email,password);
    history.replace("/");
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
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
        <Card
          className={classes.container}
          style={{ paddingTop: "20px", paddingBottom: "20px" }}
        >
          <form onSubmit={submitHandler}>
            <div className={classes.inputCOntainer}>
              <label htmlFor="email">E Mail</label>
              <Input
                id="email"
                type="email"
                placeholder="E Mail"
                onChange={emailChangeHandler}
                value={email}
                required
              />
            </div>
            <div className={classes.inputCOntainer}>
              <label htmlFor="password">Password</label>
              <Input
                id="email"
                type="password"
                placeholder="Password"
                onChange={passwordChangeHandler}
                value={password}
                required
              />
            </div>
            <div className={classes.actions}>
              <Button title="Sign up" onClick={()=>{}} style={{marginRight:"10px"}} />
              <Button title="Cancel" onClick={()=>{}} style={{marginRight:"10px"}} />
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignUpComponent;
