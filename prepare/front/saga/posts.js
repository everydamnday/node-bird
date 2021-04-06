import {
  all,
  fork,
  call,
  put,
  take,
  delay,
  takeLatest,
  throttle,
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
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE
} from "../reducers/posts";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
import shortid from "shortid";

// postSaga

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLikePost),
    fork(watchUnLikePost),
    fork(watchUpLoadImage)
  ]);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////   watchLoadPost   ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 액션 리스너
function* watchLoadPost() {
  yield throttle(5000, LOAD_POST_REQUEST, loadPost);
}

// 액션 핸들러
function* loadPost(action) {
  try {
    const res = yield call(loadPostAPI, action.data);
    yield put({ type: LOAD_POST_SUCCESS, data: res.data });
  } catch (e) {
    console.log(e);
    yield put({ type: LOAD_POST_FAILURE, error: e.response.data });
  }
}

// API
function loadPostAPI(data) {
  return axios.get("/posts", data);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////   watchAddPost   ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 액션 리스너
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}



// 액션 핸들러
function* addPost(action) {
  try {
    const res =  yield call(addPostAPI, action.data); // post
    yield put({ type: ADD_POST_SUCCESS, data: res.data }); // post 객체가 여기에 들어있음
    yield put({ type: ADD_POST_TO_ME, data: res.data.id });
  } catch (e) {
    console.log(e);
    yield put({ type: ADD_POST_FAILURE, error: e.response.data });
  }
}

// API
function addPostAPI(data) { // text
  return axios.post("/post/posts", data); // 폼데이터는 {}로 감싸면 안된다
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////   watchRemovePost   ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 액션 리스너
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

// 액션 핸들러
function* removePost(action) {
  try {
    const res = yield call(removePostAPI, action.data); // action.data = post.id
    yield put({ type: REMOVE_POST_SUCCESS, data: res.data }); // res.data = { PostId : parseInt(req.params.postId)
    yield put({ type: REMOVE_POST_OF_ME, data: res.data });
  } catch (e) {
    console.log(e);
    yield put({ type: REMOVE_POST_FAILURE, error: e.response.data });
  }
}

// API
function removePostAPI(data) {
  return axios.delete(`/post/${data}`); // data = post.id
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////   watchAddComment   ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 액션 리스너
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

// 액션 핸들러
function* addComment(action) {
  try {
    const res = yield call(addCommentAPI, action.data);
    yield put({ type: ADD_COMMENT_SUCCESS, data: res.data });
  } catch (e) {
    yield put({ type: ADD_COMMENT_FAILURE, error: e.response.data });
  }
}

// API
function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////   watchLikePost   ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 액션 리스너
function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likepost)
}

// 액션 핸들러
function* likepost(action) {
  try {
    const res = yield call(likePostAPI, action.data) // action.data : post.id
    yield put({ type : LIKE_POST_SUCCESS, data : res.data}) // res.data = { PostId : post.id, UserId : req.user.id }
  } catch (err) {
    yield put({ type : LIKE_POST_FAILURE, data : JSON.stringify(err.response.data)})
  } 
}
// API
const likePostAPI = (data) => {
  return axios.patch(`/post/${data}/like`) // data = post.id
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////   watchUnLikePost   ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 액션 리스너
function* watchUnLikePost() {
 yield takeLatest(UNLIKE_POST_REQUEST, unLikePost)
}

// 액션 핸들러
function* unLikePost(action) {
  try {
    const res = yield call(unLikePostAPI, action.data) // action.data = post.id
    yield put({type : UNLIKE_POST_SUCCESS, data : res.data}) // res.data = { PostId : post.id, UserId : req.user.id }
  } catch (err) {
    yield put({type : UNLIKE_POST_FAILURE, data : JSON.stringify(err.response.data)})
  }
}
// API
const unLikePostAPI = (data) => {
  return axios.patch(`/post/${data}/unlike`) // data : post.id
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////   watchUpLoadImage   ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 액션 리스너
function* watchUpLoadImage() {
  yield takeLatest(UPLOAD_IMAGE_REQUEST, upLoadImage)
}

// 액션 핸들러
function* upLoadImage(action) {
  try {
    const res = yield call(upLoadImageAPI, action.data)
    yield put ({ type : UPLOAD_IMAGE_SUCCESS, data : res.data })
  } catch (e) {
    console.error(e)
    yield put ({ type: UPLOAD_IMAGE_FAILURE, error : e.response.data})
  }
}

//API
const upLoadImageAPI = (data) => {
  return axios.post('/post/images', data) // 폼데이터는 그대로 data라고 쓴다. {} 감싸지 말것(json됨) 
}                                         // req.files 로 들어간다.
