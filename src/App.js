import './App.css';
import Signup from './pages/SignUp';
import {Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import AllPosts from './pages/AllPosts';
function App() {
  return (
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
    </Switch>
  );
}

export default App;
