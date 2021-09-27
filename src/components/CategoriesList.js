import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux";
import classes from "./CategoriesList.module.css";
import CategoryItem from "./CategoryItem";
import { useHistory,useLocation } from "react-router-dom";
const CategoriesList = () => {
  // const [catID,setCatID]= useState()
  const history = useHistory();
  const location=useLocation();
  const params = new URLSearchParams(location.search);
  const catId = params.get("catId");
  // useEffect(() => {
  //   setCatID(catId);
    
  // }, [catId])
  console.log(catId);
  const categories = useSelector((state) => {
    return state.userPosts.categories;
  });
  console.log(catId);
  console.log(categories);

  const onClickHandler = () => {
    history.replace("/posts");
  };
  return (
    <div className={classes.container}>
      <div className={`${classes.ItemContainer} ${!catId?classes.active:''}`} onClick={onClickHandler}>
        <h4>All</h4>
      </div>
      {categories.map((category) => (
        <CategoryItem key={category.id} isActive={catId==category.id} id={category.id} name={category.name} />
      ))}
    </div>
  );
};

export default CategoriesList;
