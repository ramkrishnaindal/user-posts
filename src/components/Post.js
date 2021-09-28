import React, { useRef, useEffect, useContext } from "react";
import AppContext from "../context/app-context";
import { getUserCategories, decodeStr } from "./../shared/utilities";
import { useSelector } from "react-redux";
import classes from "./Post.module.css";
import "@fortawesome/fontawesome-free/css/all.css";
import ConfirmModal from "./shared/ConfirmModal";
import { useHistory } from "react-router";
const Post = (props) => {
  const history = useHistory();
  const onClickHandler = () => {
    history.push(`posts/view/${props.id}?deleteAllowed=${props.deleteAllowed}`);
    // ?deleteAllowed=${props.deleteAllowed
  };
  const articleRef = useRef();
  const ctx = useContext(AppContext);
  const onDeleteHandler = (e) => {
    e.stopPropagation()
    ctx.callSetConfirm(
      `Do you want to delete the post with title "${props.title}"`
    );
  };
  const onEditHandler = (e) => {
    e.stopPropagation()
    history.push(`/posts/edit/${props.id}`)
  };
  useEffect(() => {
    articleRef.current.innerHTML = decodeStr(props.article);
  }, []);
  const categories = useSelector((state) => {
    return state.userPosts.categories;
  });
  
  const userCategories = getUserCategories(props.tags, categories);
  const users = useSelector((state) => {
    return state.userPosts.users;
  });
  debugger
  const user = users.find((user) => user.id == props.uid);

  return (
    <>
      {props.deleteAllowed && (
        <ConfirmModal
          confirmTitle="Delete"
          onConfirm={props.onConfirm.bind(this, props.uid, props.id)}
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          flexGrow: 0,
          marginTop: "30px",
          cursor: "pointer",
          backgroundColor:"white"
        }}
        onClick={onClickHandler}
      >
        <h2>
          {props.title}
          {props.deleteAllowed && (
            <span
              className={classes.editAction}
              onClick={onEditHandler}
              title="Edit"
              style={{
                position: "absolute",
                cursor: "pointer",
                right: "20px",
                color: "rgb(190, 211, 212)",
              }}
            >
              <i class={`far fa-edit ${classes.edit}`}></i>
            </span>
          )}
          {props.deleteAllowed && (
            <span
              className={classes.deleteAction}
              onClick={onDeleteHandler}
              title="Delete"
              style={{
                position: "absolute",
                cursor: "pointer",
                right: 0,
                color: "rgb(190, 211, 212)",
              }}
            >
              <i className={`far fa-trash-alt ${classes.delete}`}></i>
            </span>
          )}
        </h2>
        <div className={classes.container}>
          <hr />
          <ul>
            {userCategories.map((tag) => (
              <li key={tag.id}>{tag.name}</li>
            ))}
          </ul>
          <div ref={articleRef} className={classes.article}></div>
          <div className={classes.author}>
            <span className={classes.user}>{user.name}</span>
            <span>--</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
