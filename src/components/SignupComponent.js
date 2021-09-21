import React from "react";
import Card from "../UI/Card";
import classes from "./SignupComponent.module.css";

const SignUpComponent = () => {
  return (
    <div className={classes.parentContainer}>
        <Card className={classes.container}>
      
        <form>
          <div className={classes.inputCOntainer}>
            <label htmlFor="email">E Mail</label>
            <input
              id="email"
              type="email"
              placeholder="E Mail"
              className={classes.input}
            />
          </div>
          <div className={classes.inputCOntainer}>
            <label htmlFor="password">Password</label>
            <input
              id="email"
              type="password"
              placeholder="Password"
              className={classes.input}
            />
          </div>
        </form>
        </Card>
    </div>
  );
};

export default SignUpComponent;
