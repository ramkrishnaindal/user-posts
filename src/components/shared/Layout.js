import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Layout.module.css";
import AppContext from "../../context/app-context";
import Button from "../UI/Button";
const Layout = (props) => {
  const ctx = useContext(AppContext);
  console.log(ctx.isLoggedIn );
  const loggedInComponents = ctx.isLoggedIn ? (
    <>
      <li>
        <Link to="/posts/newPost">
          <Button title="New Post" onClick={() => {}} style={{width:"10vw"}}/>
        </Link>
      </li>
      <li>
        <Button title="Sign Out" onClick={ctx.signOff} style={{width:"10vw"}}/>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link to="/signup">
          <Button title="Sign Up" onClick={ctx.signOff} style={{width:"10vw"}} />
        </Link>
      </li>
      <li>
        <Link to="/login">
          <Button title="Login" onClick={ctx.signOff} style={{width:"10vw"}} />
        </Link>
      </li>
    </>
  );
  const isImage = !!props.imageUrl;
  const contLogo = isImage ? (
    <img className={classes.logo} src={props.imageUrl} alt={props.title} />
  ) : (
    <span className={classes.logo} style={{ display: "inline-block" }}>{props.title}</span>
  );
  return (
    <div className={classes.container}>
      <div className={classes.containerLogo}><Link to="/"> {contLogo}</Link></div>
      <h1> User Posts</h1>
      <div >
        <nav>
          <ul className={classes.containerNav}>{loggedInComponents}</ul>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
