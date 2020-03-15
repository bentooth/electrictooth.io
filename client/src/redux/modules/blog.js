//import _ from 'lodash'
import axios from 'axios';
import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';
import { getDate } from 'lib/utils';

/* BLOG API */
const getBlogPosts = (page) => {
  return axios.get(`/api/blog/${page}`);
};

const findBlogPost = (post_url) => {
  return axios.get(`/api/find/${post_url}`);
};

/* BLOG ACTION CREATORS */
export const GET_BLOG_POSTS = 'blog/GET_BLOG_POSTS';
export const getPosts = createAction(GET_BLOG_POSTS, getBlogPosts);

export const FIND_POST = 'blog/FIND_POST';
export const findPost = createAction(FIND_POST, findBlogPost);

/* BLOG INITIAL STATE & REDUCERS */
const initialState = {
  posts: [],
  current: 1,
  pages: null,
  error: null,
  currentPost: null,
  updatedAt: getDate(),
};

//reducer that manages request status
export default handleActions(
  {
    ...pender({
      type: GET_BLOG_POSTS,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };

        newState.posts = payload.data.posts;
        newState.pages = payload.data.pages;
        newState.current = payload.data.current;

        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: payload };
      },
    }),
    ...pender({
      type: FIND_POST,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };

        newState.currentPost = payload.data;

        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: payload };
      },
    }),
  },
  initialState,
);
