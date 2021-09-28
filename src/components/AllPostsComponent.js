import React, { useContext } from "react";
import Post from "./Post";
import {useDispatch } from "react-redux";
import AppContext from "../context/app-context";
import { getUniqueTags } from "../shared/utilities";
import { storeActions } from "./../store/store";
import { deleteCategory, deletePost } from "../shared/firebase";
const AllPostsComponent = (props) => {
  const dispatch = useDispatch();
  const ctx = useContext(AppContext);
  const onConfirmHandler = async (uid, id) => {
    const tagsToDelete = getUniqueTags(id, props.posts);
    tagsToDelete.forEach(async(tagId) => {
      const delRef = await deleteCategory(tagId);
      console.log(delRef);
    });
    dispatch(storeActions.deleteCategories(tagsToDelete));
    const delRef = await deletePost(uid, id);
    console.log(delRef);
    dispatch(storeActions.deletePosts({ uid, id }));
    ctx.clearConfirm();
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        paddingTop: "20px",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        gap: "20px, 30px",
        flexWrap: "wrap",
      }}
    >
      {props.posts.map((post) => {
        return (
          <Post
            key={post.id}
            article={post.article}
            deleteAllowed={ctx.uid===post.uid}
            uid={post.uid}
            id={post.id}
            title={post.title}
            tags={post.tags}
            onConfirm={onConfirmHandler}
          />
        );
      })}
    </div>
  );
};

export default AllPostsComponent;
