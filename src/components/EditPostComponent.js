import React, { useState, useContext, useEffect } from "react";
import AppContext from "../context/app-context";
import classes from "./EditPostComponent.module.css";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Card from "./UI/Card";
import { decodeStr } from "./../shared/utilities";
import { useHistory, useParams } from "react-router-dom";
import AutoComplete from "./UI/AutoComplete";
import { useDispatch, useSelector } from "react-redux";
import RichText from "./UI/RichText";
import { addCategory, editPost, deleteCategory } from "../shared/firebase";
import { encodeStr } from "../shared/utilities";
import { EditorState, ContentState } from "draft-js";
import { storeActions } from "../store/store";
import htmlToDraft from "html-to-draftjs";

const EditPostComponent = () => {
  const params = useParams();
  const postId = params.id;
  const [title, setTitle] = useState("");
  const ctx = useContext(AppContext);
  const history = useHistory();
  debugger;
  const [htmlContent, setHtmlContent] = useState("");
  const [initialHtmlContent, setInitialHtmlContent] = useState("");
  const [contentLoaded, setContentLoaded] = useState(false);
  const [tags, setTags] = useState([]);
  const [initialTags, setInitialTags] = useState();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.userPosts.categories);
  const posts = useSelector((state) => state.userPosts.posts);
  const userPost = posts.find((post) => post.id == postId);

  const { title: initTitle, tags: initTags, article } = userPost;
  useEffect(() => {
    if (userPost) setTitle(initTitle);
    if (userPost) setTags(initTags || []);
    if (userPost) setInitialTags(initTags || []);
    const contentBlock = htmlToDraft(decodeStr(article));
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setInitialHtmlContent(decodeStr(article));
      setContentLoaded(true)
    }
  }, [initTitle, initTags, article]);

  if (!userPost) return null;
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
  const getTagsToDelete = () => {
    const tagNames=tags.map(tag=>tag.name)    
    return initialTags.filter(init=>!tagNames.includes(init.name));
  };
  const addTags = async (tagsToAdd) => {
    const tagIdsToAdd = [];
    let id;
    for (const tag of tagsToAdd) {
      try {
        id = await addCategory(tag);
        tagIdsToAdd.push(id);
      } catch (error) {
        ctx.callSetError(error);
        return;
      }
    }
    return tagIdsToAdd;
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    let tagIds = [];
    const tagsToAdd = getUniqueCatgoryTags(
      tags.length == 0 ? initialTags : tags
    );
    tagIds = await addTags(tagsToAdd);
    dispatch(storeActions.addCategories(tagIds));
    debugger
    const tagsToDelete=getTagsToDelete();
    tagsToDelete.forEach(async(tagId) => {
      const delRef = await deleteCategory(tagId.id);
      console.log(delRef);
    });
    dispatch(storeActions.deleteCategories(tagsToDelete));
    await addTags(tagsToAdd);
    debugger;
    const data = {
      tags: tagIds,
      title,
      article: encodeStr(htmlContent?htmlContent:initialHtmlContent),
    };
    // const user= await logIn(email,password);
    // console.log(title, htmlContent, tags.length == 0 ? initialTags : tags);
    try {
      const docId = await editPost(ctx.uid,postId, data);

      dispatch(
        storeActions.editPost({
          id: docId,
          uid: ctx.uid,
          ...data,
        })
      );
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
        <h1>Edit Post</h1>
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
              {contentLoaded && (
                <AutoComplete
                  title="Select Categories"
                  tags={initialTags}
                  suggestions={categories || []}
                  onTagsChanged={tagsChangeHandler}
                />
              )}
            </div>
            {contentLoaded && (
              <RichText
                title="Article"
                html={initialHtmlContent}
                setHtml={setHtmlContent}
              />
            )}

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

export default EditPostComponent;
