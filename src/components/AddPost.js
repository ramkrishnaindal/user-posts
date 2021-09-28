import React, { useState, useContext } from "react";
import AppContext from "../context/app-context";
import classes from "./AddPost.module.css";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Card from "./UI/Card";
import { useHistory } from "react-router-dom";
import AutoComplete from "./UI/AutoComplete";
import {useDispatch,useSelector} from 'react-redux'
import RichText from "./UI/RichText";
import { addCategory, addPost,getCategories } from "../shared/firebase";
import { encodeStr } from "../shared/utilities";

import { storeActions } from './../store/store';
const AddPost = () => {
  const categories = useSelector((state) => state.userPosts.categories);
  const dispatch=useDispatch();
  const initialTags = [];
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [tags, setTags] = useState([]);
  const ctx = useContext(AppContext);
  console.log("ctx",ctx)
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const getUniqueCatgoryTags = (tags) => {
    const tagsToAdd = [];
    tags.forEach((tag) => {
      if (!tagsToAdd.includes(tag.name)) tagsToAdd.push(tag.name);
    });
    return tagsToAdd;
  };
  const addTags=async (tagsToAdd)=>{
    const tagIdsToAdd = [];
    let id;
    for(const tag of tagsToAdd){
      try {
        id = await addCategory(tag);
        tagIdsToAdd.push(id);
      } catch (error) {
        ctx.callSetError(error);
        return;
      }
    }
    return tagIdsToAdd;
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    let tagIds = [];
    const tagsToAdd = getUniqueCatgoryTags(
      tags.length == 0 ? initialTags : tags
    );
    tagIds = await addTags(tagsToAdd);
    dispatch(storeActions.addCategories(tagIds));
    const data = {
      tags: tagIds,
      title,
      article: encodeStr(htmlContent),
    };
    // const user= await logIn(email,password);
    // console.log(title, htmlContent, tags.length == 0 ? initialTags : tags);
    try {      
      const docId=await addPost(ctx.uid, data);
      
      dispatch(storeActions.addPost({
        id:docId,
        uid:ctx.uid,
        ...data
      }))
    } catch (error) {
      ctx.callSetError(error);
      return;
    }

    history.push("/");
    // const user = await ctx.login(title);
    
    // if (user) history.replace("/");
  };

  const cancelHandler = () => {
    ctx.clearError();
    history.replace("/");
  };
  const tagsChangeHandler = (tags) => {
    setTags(tags);
  };

  return (
    <div className={classes.content}>
      <Card className={classes.title}>
        <h1>Add Post</h1>
      </Card>
      <div className={classes.parentContainer}>
        <Card className={classes.container} style={{ paddingBottom: "20px" }}>
          <form onSubmit={submitHandler}>
            <div className={classes.firstRow}>
              <Input
                id="text"
                type="text"
                placeholder="Enter title of the post"
                onChange={titleChangeHandler}
                value={title}
                title="Title"
                required
                inputContainerStyle={{ flexDirection: "column" }}
              />
              <AutoComplete
                title="Select Categories"
                tags={initialTags}
                suggestions={categories}
                onTagsChanged={tagsChangeHandler}
              />
            </div>
            <RichText
              title="Article"
              html={htmlContent}
              setHtml={setHtmlContent}
            />

            <div className={classes.actions}>
              <Button
                title="Save"
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
