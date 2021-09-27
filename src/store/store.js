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
        state.categories=state.categories.filter(cat=>!tags.includes(cat.id));
      },
      deletePosts(state,action) { 
        debugger;       
        const uid=action.payload.uid;
        const id=action.payload.id;
        state.posts=state.posts.filter(post=>!(post.uid===uid && post.id===id));
      },
      addPost(state,action) {        
        state.posts =[...state.posts,action.payload] ;
      },
      loadUsers(state,action) {
        state.users=action.payload;
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
