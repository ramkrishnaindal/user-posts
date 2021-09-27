import React, { useState, useContext } from "react";
import Card from "./UI/Card";
import classes from "./SignupComponent.module.css";
import Input from "./UI/Input";
import Button from "./UI/Button";
import AppContext from "../context/app-context";
import { useHistory } from "react-router-dom";

const LoginComponent = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const ctx = useContext(AppContext);
  const [password, setPassword] = useState("");
  const submitHandler = async (event) => {
    event.preventDefault();

    // const user= await logIn(email,password);
    // console.log(user);
    const user = await ctx.login(email, password);
    debugger;
    if (user) history.replace("/");
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const cancelHandler = () => {
    ctx.clearError();
    history.replace("/");

  };
  return (
    <div className={classes.content}>
      <Card className={classes.title}>
        <h1> Login</h1>
      </Card>
      <div className={classes.parentContainer}>
        <Card
          className={classes.container}
          style={{paddingBottom: "20px" }}
        >
          <form onSubmit={submitHandler}>
              
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
              <Input
                id="email"
                type="password"
                placeholder="Password"
                title="Password"
                onChange={passwordChangeHandler}
                value={password}
                inputContainerLabelStyle={{paddingTop:"10px"}}
                required
              />
            <div className={classes.actions}>
              <Button
                title="Login"
                onClick={()=>{}}
                style={{ marginRight: "10px" }}
              />
              <Button
                title="Cancel"
                type="button"
                onClick={cancelHandler}
                style={{ marginRight: "10px" }}
              />
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginComponent;
