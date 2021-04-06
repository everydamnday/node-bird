import { all, fork, call, put, delay, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE
} from "../reducers/user";

// userSaga

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchChangeNickname),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLoadUser),
  ]);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////   watchLoadUser   //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//액션 리스너
function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser)
}
//액션 핸들러
function* loadUser(action) {
  try {
    const res = yield call(loadUserAPI)
    yield put({ type: LOAD_USER_SUCCESS, data : res.data }) // res.status(200).send(user)를 받음
  } catch (e) {
    yield put({ type: LOAD_USER_FAILURE, error : e.response.data})
  }
}

//API
const loadUserAPI = () => {
  return axios.get("/user")
}





///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////   watchLogin   ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 액션 리스너 역할
function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

// 액션 핸들러
function* logIn(action) {
  try {
    const res = yield call(loginAPI, action.data);
    yield put({ type: LOG_IN_SUCCESS, data: res.data }); // put은 리듀서에 dispatch 하는 이펙트. 액션 객체가 들어간다.
  } catch (e) {
    yield put({ type: LOG_IN_FAILURE, error: e.response.data }); //에러는 여기에 담겨있다.
  }
}

// API(call 이펙트를 위해 굳이 분리해야 한다.)
const loginAPI = (data) => {
  return axios.post("/user/login", data);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////   watchLogOut   ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 액션 리스너
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

// 액션 핸들러
function* logOut() {
  try {
    const res = yield call(logoutAPI);
    yield put({ type: LOG_OUT_SUCCESS });
  } catch (e) {
    yield put({ type: LOG_OUT_FAILURE, error: e.response.data });
  }
}
// API
const logoutAPI = () => {
  return axios.post("/user/logout");
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////   watchSignUp   ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 액션 리스너
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

// 액션 핸들러
function* signUp(action) {
  try {
    const res = yield call(signupAPI, action.data);
    console.log(res)
    yield put({
      type: SIGN_UP_SUCCESS,
      data: res.data,
    });
  } catch (e) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: e.response.data,
    });
  }
}

// API
const signupAPI = (data) => {
  return axios.post("/user", data);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////   watchFollow   ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 액션 리스너 역할
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

// 액션 핸들러
function* follow(action) {
  try {
    const res = yield call(followAPI, action.data); // action.data = post.User.id
    yield put({ type: FOLLOW_SUCCESS, data: res.data }); // res.data = { UserId : req.body.UserId, nickname : user.nickname}
  } catch (e) {
    yield put({ type: FOLLOW_FAILURE, error: e.response.data }); //에러는 여기에 담겨있다.
  }
}

// API(call 이펙트를 위해 굳이 분리해야 한다.)
const followAPI = (data) => {
  return axios.patch("/user/follow", { UserId : data });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////   watchUnFollow   /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 액션 리스너
function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unFollow);
}

// 액션 핸들러
function* unFollow(action) {
  try {
    const res = yield call(unFollowAPI, action.data); // action.data = post.User.id
    yield put({ type: UNFOLLOW_SUCCESS, data: res.data }); // res.data = { UserId : req.body.UserId }
  } catch (e) {
    yield put({ type: UNFOLLOW_FAILURE, error: e.response.data });
  }
}
// API
const unFollowAPI = (data) => {
  return axios.patch("/user/unfollow", { UserId : data }); //axios.delete("/user/{data}/follow") 이렇게도 가능.
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////   watchChangeNickname   ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 액션 리스너
function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

// 액션 핸들러
function* changeNickname(action) {
  try {
    const res = yield call(changeNicknameAPI, action.data); // nickname => action.data
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: res.data, // { nickname : req.body.nickname } => res.data 
    });
  } catch (e) {
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: e.response.data,
    });
  }
}

// API
const changeNicknameAPI = (data) => {
  return axios.patch("/user/nickname", { nickname : data }); // { nickname : data } => req.body
};
