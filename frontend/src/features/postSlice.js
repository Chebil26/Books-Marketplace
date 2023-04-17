import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};



const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postListRequest(state) {
      state.loading = true;
      state.error = null;
    },
    postListSuccess(state, action) {
      state.loading = false;
      state.posts = action.payload;
    },
    postListFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const getPosts = () => async (dispatch) => {
    dispatch(postListRequest());
  
    try {
      const response = await axios.get('/api/blogs/posts/');
      dispatch(postListSuccess(response.data));
    } catch (error) {
      dispatch(postListFail(error.message));
    }
};

export const { postListRequest, postListSuccess, postListFail } = postSlice.actions;

export default postSlice.reducer;
