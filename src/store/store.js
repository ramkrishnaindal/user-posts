import { configureStore,createSlice } from '@reduxjs/toolkit'

const postsSlice=createSlice({
    name: 'userAndPosts',
    initialState:{categories:[],users:[],posts:[]},
    reducers: {
      loadCategories(state,action) {
        state.categories=action.payload;
      },
      addCategories(state,action) {        
        const tags=action.payload;
        const stateCatIDs=state.categories.map(cat=>cat.id);

        const tagsToAdd=tags.filter(tag=>!stateCatIDs.includes(tag.id))
        state.categories=[...state.categories,...tagsToAdd];
      },
      deleteCategories(state,action) {        
        const tags=action.payload;
        const IDs=tags.map(cat=>cat.id)
        state.categories=state.categories.filter(cat=>!IDs.includes(cat.id));
      },
      deletePosts(state,action) {         
        const uid=action.payload.uid;
        const id=action.payload.id;
        state.posts=state.posts.filter(post=>!(post.uid===uid && post.id===id));
      },
      addPost(state,action) {                
        state.posts =[...state.posts,action.payload] ;
      },
      editPost(state,action) {                
        state.posts =state.posts.map(statePost=>{
          if(statePost.id===action.payload.id)
            return action.payload;
          else
           return statePost;
        })
      },
      loadUsers(state,action) {
        state.users=action.payload;
      },
      addUser(state,action) {
        state.users=[...state.users,action.payload];
      },
      loadPosts(state, action) {
        state.posts =[...state.posts,...action.payload] ;
      }
    }
})
export const storeActions=postsSlice.actions;
const store = configureStore({    
    reducer: {
        userPosts:postsSlice.reducer
    },devTools:true
  })
export default store;
