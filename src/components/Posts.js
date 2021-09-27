import React from "react";
import {useLocation} from 'react-router-dom'
import CategoriesList from "./CategoriesList";
import { useSelector } from "react-redux";
import AllPostsComponent from './AllPostsComponent';

const Posts = (props) => {
  const location= useLocation()
  
  const params = new URLSearchParams(location.search);
  const catId = params.get("catId");
  const allPosts = useSelector((state) => {
    return state.userPosts.posts;
  });
  let posts=allPosts;
  if(catId){
    posts=allPosts.filter(post=>post.tags.includes(catId));
  }
  console.log("posts",posts)
  return (
    <div style={{ flex: 1, display: "flex" }}>
      <CategoriesList />
      <AllPostsComponent posts={posts}/>
    </div>
  );
};

export default Posts;
