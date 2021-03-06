import React, { useContext, useRef, useEffect } from "react";
import AppContext from "../context/app-context";
import classes from "./ViewPost.module.css";
import Card from "./UI/Card";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import Button from "./UI/Button";
import ConfirmModal from "./shared/ConfirmModal";
import { useHistory, useLocation } from "react-router-dom";
import { decodeStr } from "./../shared/utilities";
import { deleteCategory, deletePost } from "../shared/firebase";
import { storeActions } from "./../store/store";
import { getUniqueTags } from "../shared/utilities";
import TextArea from './UI/TextArea'
const ViewPost = (props) => {
  const articleRef = useRef();
  const commentRef = useRef();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const deleteAllowed = params.get("deleteAllowed");
  let isTrueSet;
  if (deleteAllowed) isTrueSet = deleteAllowed === "true";
  const dispatch = useDispatch();
  const history = useHistory();
  const ctx = useContext(AppContext);
  const postId = useParams().postId;
  const categories = useSelector((state) => state.userPosts.categories);
  const posts = useSelector((state) => state.userPosts.posts);
  const userPost = posts.find((post) => post.id === postId);
  useEffect(() => {
    if(userPost)
      articleRef.current.innerHTML = decodeStr(userPost.article);
  }, [userPost]);
  const onConfirmHandler = async () => {
    ctx.clearConfirm()
    const tagsToDelete = getUniqueTags(userPost.id, posts);
    tagsToDelete.forEach(async(tag) => {
      const delRef = await deleteCategory(tag.id);
      console.log(delRef);
    });
    dispatch(storeActions.deleteCategories(tagsToDelete));
    const delRef = await deletePost(userPost.uid, userPost.id);
    console.log(delRef);
    dispatch(storeActions.deletePosts({uid:userPost.uid,id:userPost.id}));
    ctx.clearConfirm();
    history.replace('/')
  };
  if(!userPost) return null;
  if (!categories) return null;
  if (!posts) return null;
  const IDs=userPost.tags.map(cat=>cat.id);
  const userCategories = categories.filter((cat) =>
  IDs.includes(cat.id)
  );
  const cancelHandler = () => {
    history.goBack();
  };
  const submitHandler=(e)=>{
    e.preventDefault()
    debugger
    console.log(commentRef.current.value)
  }
  const deleteHandler=()=>{
    ctx.callSetConfirm(
      `Do you want to delete the post with title "${userPost.title}"`
    );
  }
  if (!userPost) {
    return (
      <Card style={{ height: "50%", width: "50%", margin: "auto" }}>
        <div
          style={{
            margin: "auto",
            height: "100%",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <h2 style={{ width: "50%" }}>Post not found</h2>
        </div>
      </Card>
    );
  }
  return (
    <div className={classes.contentContainer}>
      {isTrueSet && (
        <ConfirmModal
          confirmTitle="Delete"
          onConfirm={onConfirmHandler}
        />
      )}

      <div className={classes.content}>
        <Card className={classes.title}>
          <h1>View Post</h1>
        </Card>
        <div className={classes.parentContainer}>
          <Card className={classes.container} style={{ paddingBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexGrow: 1,

                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div className={classes.inputContainer}>
                  <div
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <label>Title</label>
                  </div>
                  <label className={classes.textLabel}>{userPost.title}</label>
                </div>
                <div className={classes.categoryContainer}>
                  <div className={classes.labelContainer}>
                    <div style={{ display: "flex" }}>
                      <label>Categories</label>
                    </div>
                  </div>
                  <div className={classes.tagsContainer}>
                    {userCategories.map((cat) => {
                      return (
                        <label className={classes.tagLabel} key={cat.id}>
                          {cat.name}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={classes.inputContainer}>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <label>Article</label>
                </div>
                <div style={{ overflowY: "auto", maxHeight: "70vh" }}>
                  <div className={classes.articleLabel} ref={articleRef}>
                    {userPost.title}
                  </div>
                </div>
              </div>
              <form onSubmit={submitHandler} style={{display:"flex",alignItems:"flex-end",justifyContent:"flex-end"}}>
              <div className={classes.inputContainer}>
            
              <TextArea
                id="comments"
                placeholder="Enter comments for the post"
                title="Comments"
                required
                rows={6}
                ref={commentRef}
                className={classes.post}
                cols={80}
              />
            </div>
            
            <Button className={classes.btnPost}
                    title="Post"
                    style={{ marginRight: "10px" }}
                  />
            
            </form>
              <div className={classes.actions}>
                {isTrueSet && (
                  <Button
                    title="Edit"
                    onClick={() => {
                      history.push(`/posts/edit/${postId}`);
                    }}
                    style={{ marginRight: "10px" }}
                  />
                )}
                {isTrueSet && (
                  <Button
                    title="Delete"
                    onClick={deleteHandler}
                    style={{ marginRight: "10px",color:"red" }}
                  />
                )}
                <Button
                  title="Cancel"
                  type="button"
                  onClick={cancelHandler}
                  style={{ marginRight: "10px" }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
