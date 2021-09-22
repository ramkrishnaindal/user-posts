import React, { useState, useContext } from "react";
import AppContext from "../context/app-context";
import classes from "./AddPost.module.css";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Card from "./UI/Card";
import { useHistory } from "react-router-dom";
const AddPost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const ctx = useContext(AppContext);
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();

    // const user= await logIn(email,password);
    // console.log(user);
    const user = await ctx.login(title, author);
    debugger;
    if (user) history.replace("/");
  };

  const authorChangeHandler = (event) => {
    setAuthor(event.target.value);
  };
  const cancelHandler = () => {
    ctx.clearError();
    history.replace("/");
  };

  return (
    <div className={classes.content}>
      <Card className={classes.title}>
        <h1>Add Post</h1>
      </Card>
      <div className={classes.parentContainer}>
        <Card className={classes.container} style={{ paddingBottom: "20px" }}>
          <form onSubmit={submitHandler}>
            <Input
              id="text"
              type="text"
              placeholder="Enter title of the post"
              onChange={titleChangeHandler}
              value={title}
              title="Title"
              required
            />
            <Input
              id="text"
              type="text"
              placeholder="Enter the Author's name"
              onChange={authorChangeHandler}
              value={author}
              title="Author"
              required
            />
            <div className={classes.actions}>
              <Button
                title="Login"
                onClick={() => {}}
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

export default AddPost;
