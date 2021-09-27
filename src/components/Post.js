import React, { useRef,useEffect } from "react";
import { getUserCategories, decodeStr } from "./../shared/utilities";
import { useSelector } from "react-redux";
import classes from "./Post.module.css";

const Post = (props) => {
  const articleRef = useRef();  
  
  useEffect(() => {
    articleRef.current.innerHTML = decodeStr(props.article);  
  }, [])
  const categories = useSelector((state) => {
    return state.userPosts.categories;
  });
  const userCategories = getUserCategories(props.tags, categories);
  const users = useSelector((state) => {
    return state.userPosts.users;
  });
  debugger;
  const user = users.find((user) => user.id == props.uid);

  return (
    <div style={{display:"flex",flexDirection:"column"}}>
    <h2>{props.title}</h2>
    <div className={classes.container}>    
      <hr />
      <ul>
        {userCategories.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
      <div ref={articleRef} className={classes.article}></div>
      <div  className={classes.author}>
        <span className={classes.user}>{user.name}</span><span>--</span>
      </div>
    </div>
    </div>
  );
};

export default Post;
