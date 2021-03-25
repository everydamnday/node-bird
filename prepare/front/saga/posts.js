import {
  all,
  fork,
  call,
  put,
  take,
  delay,
  takeLatest,
} from "redux-saga/effects";
import axios from "axios";
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
} from "../reducers/posts";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
import shortid from "shortid";

// postSaga

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment), fork(watchRemovePost)]);
}

///////////////////////////////////////////////   watchAddPost   ///////////////////////////////////////////////

// 액션 리스너
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

// 액션 핸들러
function* addPost(action) {
  try {
    // const res = yield call(addPostAPI, action.data);
    yield delay(1000);
    const id = shortid.generate();
    yield put({ type: ADD_POST_SUCCESS, data: { id, content: action.data } });
    yield put({ type: ADD_POST_TO_ME, data: id });
  } catch (e) {
    console.log(e);
    yield put({ type: ADD_POST_FAILURE, error: e.response.data });
  }
}

// API
function addPostAPI(data) {
  return axios.post("api/post", data);
}

///////////////////////////////////////////////   watchRemovePost   ///////////////////////////////////////////////

// 액션 리스너
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

// 액션 핸들러
function* removePost(action) {
  try {
    // const res = yield call(removePostAPI, action.data);
    yield delay(1000);
    yield put({ type: REMOVE_POST_SUCCESS, data: action.data });
    yield put({ type: REMOVE_POST_OF_ME, data: action.data });
  } catch (e) {
    console.log(e);
    yield put({ type: REMOVE_POST_FAILURE, error: e.response.data });
  }
}

// API
function removePostAPI(data) {
  return axios.delete("api/post", data);
}

///////////////////////////////////////////////   watchAddComment   ///////////////////////////////////////////////

// 액션 리스너
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

// 액션 핸들러
function* addComment(action) {
  console.log(action.data, "addComment");
  try {
    // const res = yield call(addCommentAPI, action.data);
    yield delay(1000);
    yield put({ type: ADD_COMMENT_SUCCESS, data: action.data });
  } catch (e) {
    yield put({ type: ADD_COMMENT_FAILURE, error: e.response.data });
  }
}

// API
function addCommentAPI(data) {
  return axios.post(`api/post/${data.postId}/comment`, data);
}
