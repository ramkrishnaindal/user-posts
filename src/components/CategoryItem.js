import React from 'react'
import classes from './CategoryItem.module.css'
import { useHistory,useLocation } from 'react-router-dom';
const CategoryItem = (props) => {
    console.log("item rerendered")
    const location=useLocation();
    const params = new URLSearchParams(location.search);
    const catId = params.get("catId");
  console.log("catId",catId)
    const history =useHistory();
      
    const onClickHandler=(id)=>{
        history.push(`/posts?catId=${id}`);
    }
    console.log(props.isActive)
    return (
        <div className={`${classes.itemContainer} ${props.isActive?classes.active:''}`} onClick={onClickHandler.bind(this,props.id)}>
            <h4>{props.name}</h4>
        </div>
    )
}

export default CategoryItem
