import * as FileSystem from "expo-file-system";
import { DB } from "../../db";

// action types
const LOAD_POSTS = "LOAD_POSTS";
const ADD_POST = "ADD_POST";
const TOGGLE_BOOKED = "TOGGLE_BOOKED";
const REMOVE_POST = "REMOVE_POST";

// actions
export const loadPostsAC = (payload) => ({ type: LOAD_POSTS, payload });
export const addPostAC = (payload) => ({ type: ADD_POST, payload });
export const toggleBookedAC = (payload) => ({ type: TOGGLE_BOOKED, payload });
export const removePostAC = (payload) => ({ type: REMOVE_POST, payload });

// reducer
const initialState = {
  allPosts: [],
  bookedPosts: [],
  isLoading: true,
};

export const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_POSTS:
      return {
        ...state,
        allPosts: payload,
        bookedPosts: payload.filter((post) => post.booked),
        isLoading: false
      };
    case ADD_POST:
      return {
        ...state,
        allPosts: [payload, ...state.allPosts],
      };

    case TOGGLE_BOOKED:
      const allPosts = state.allPosts.map((post) => {
        if (post.id === payload) {
          post.booked = !post.booked;
        }
        return post;
      });
      return {
        ...state,
        allPosts,
        bookedPosts: allPosts.filter((post) => post.booked),
      };

    case REMOVE_POST:
      const posts = state.allPosts.filter((post) => post.id !== payload);
      return {
        ...state,
        allPosts: posts,
        bookedPosts: posts.filter((post) => post.booked),
      };
      
    default:
      return state;
  }
};

// thunk

export const loadPosts = () => async (dispatch) => {
  const posts = await DB.getPosts();
  dispatch(loadPostsAC(posts));
};

export const addPost = (post) => async (dispatch) => {
  const fileName = post.img.split("/").pop();
  const newPath = FileSystem.documentDirectory + fileName;
  try {
    await FileSystem.moveAsync({
      to: newPath,
      from: post.img,
    });

    let payload = { ...post, img: newPath };

    const id = await DB.createPost(payload);

    payload.id = id;

    dispatch(addPostAC(payload));
  } catch (e) {
    console.log("ADD POST ERROR: ", e);
  }
};

export const toggleBooked = (post) => async (dispatch) => {
  await DB.updatePost(post);
  dispatch(toggleBookedAC(post.id));
};

export const removePost = (id) => async (dispatch) => {
  await DB.removePost(id);
  dispatch(removePostAC(id));
};
