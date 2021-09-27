import { configureStore,createSlice } from '@reduxjs/toolkit'

const postsSlice=createSlice({
    name: 'userAndPosts',
    initialState:{categories:[],users:[],posts:[]},
    reducers: {
      loadCategories(state,action) {
        state.categories=action.payload;
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
    },
  })
export default store;
