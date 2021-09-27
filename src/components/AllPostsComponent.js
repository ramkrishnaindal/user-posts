import React from "react";
import Post from './Post';
import {useSelector} from 'react-redux'

const AllPostsComponent = (props) => {    
    const categories = useSelector((state) => {
        return state.userPosts.categories;
      });
    console.log("posts",props.posts)
    return (
      <div style={{ width:"100%",display: "flex",paddingTop:"20px",flexDirection:"row",justifyContent:"space-evenly",alignItems:"flex-start" ,flexWrap:"wrap"}}>
        {props.posts.map(post=>{
            return <Post key={post.id} article={post.article} uid={post.uid} id={post.id} title={post.title} tags={post.tags}/>
        })}        
      </div>
    );
  }

export default AllPostsComponent;
