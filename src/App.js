import { useContext,useEffect } from 'react';
import './App.css';
import Signup from './pages/SignUp';
import {Route, Switch,Redirect} from 'react-router-dom';
import Login from './pages/Login';
import ViewPosts from './pages/ViewPosts';
import AllPosts from './pages/AllPosts';
import AddNewPosts from './pages/AddNewPost'
import AppContext from './context/app-context';
import EditPost from './pages/EditPost';
import Layout from './components/shared/Layout';
import ErrorModal from './components/shared/ErrorModal';
import Container from './components/shared/Container';
import {getCategories,getUsers,getUsersPosts} from './shared/firebase';
import {useDispatch} from 'react-redux';
import {storeActions} from './store/store'

function App() {  
  const dispatch = useDispatch();
  useEffect(()=>{      
    const getCat=async()=>{
      const cat=await getCategories();
      dispatch(storeActions.loadCategories(cat))
    }
    const getUsersData=async()=>{  
      debugger;    
      const users=await getUsers();
      dispatch(storeActions.loadUsers(users))
      for(const user of users){
        const posts=await getUsersPosts(user.id);
        dispatch(storeActions.loadPosts(posts.map(post=>{return {uid:user.id,...post}})))
      }
      
    }
    getCat();
    getUsersData();
  },[dispatch]);
  const ctx=useContext(AppContext);
  const loggedInRoutes=ctx.isLoggedIn?<>
  <Route path="/posts/newPost" exact>
        <AddNewPosts />
      </Route>
      <Route path="/posts/edit/:id" exact>
        <EditPost />
      </Route>
  </>:null;
  return (
    <>
    
    <ErrorModal onClose={()=>ctx.clearError()}/>
    <div style={{display:"flex",flexDirection:"column",height:"100vh"}}>
    <Layout title="User Posts" imageUrl={process.env.PUBLIC_URL + '/blog.jfif'} />
    <Container>
    <Switch>
    <Route path="/posts" exact>
        <AllPosts/>
      </Route>
      <Route path="/" exact>
        <Redirect to="/posts"/>
      </Route>
      <Route path="/signup">
        <Signup/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/posts/view/:postId" >
        <ViewPosts/>
      </Route>

      {loggedInRoutes}

      {/* <Route path="**">
        <Redirect to="/posts"/>
      </Route> */}
    </Switch>
    </Container>
    </div>
    </>
  );
}

export default App;
