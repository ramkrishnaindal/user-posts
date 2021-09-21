import { useContext } from 'react';
import './App.css';
import Signup from './pages/SignUp';
import {Route, Switch,Redirect} from 'react-router-dom';
import Login from './pages/Login';
import AllPosts from './pages/AllPosts';
import AddNewPosts from './pages/AddNewPost'
import AppContext from './context/app-context';
import EditPost from './pages/EditPost';
import Layout from './components/shared/Layout';

function App() {
  const ctx=useContext(AppContext);
  const loggedInRoutes=ctx.isLoggedIn?<>
  <Route path="/posts/newPost">
        <AddNewPosts />
      </Route>
      <Route path="/posts/:id">
        <EditPost />
      </Route>
  </>:null;
  return (
    <>
    <Layout title="User Posts" imageUrl={process.env.PUBLIC_URL + '/blog.jfif'} />
    <Switch>
      <Route path="/" exact>
      </Route>
      <Route path="/signup">
        <Signup/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/posts">
        <AllPosts/>
      </Route>
      {loggedInRoutes}
      <Route path="**">
        <Redirect to="/"/>
      </Route>
    </Switch>
    </>
  );
}

export default App;
