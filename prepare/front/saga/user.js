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
  ]);
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
    // const res = yield call(loginAPI, action.data);
    yield delay(1000);
    yield put({ type: LOG_IN_SUCCESS, data: action.data }); // put은 리듀서에 dispatch 하는 이펙트. 액션 객체가 들어간다.
  } catch (e) {
    yield put({ type: LOG_IN_FAILURE, error: e.response.data }); //에러는 여기에 담겨있다.
  }
}

// API(call 이펙트를 위해 굳이 분리해야 한다.)
const loginAPI = (data) => {
  return axios.post("/api/login", data);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////   watchLogOut   ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 액션 리스너
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

// 액션 핸들러
function* logOut(action) {
  try {
    // const res = yield call(logoutAPI, action.data);
    yield delay(1000);
    yield put({ type: LOG_OUT_SUCCESS });
  } catch (e) {
    yield put({ type: LOG_OUT_FAILURE, error: e.response.data });
  }
}
// API
const logoutAPI = (data) => {
  return axios.post("/api/post", data);
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
    // const res = yield call(signupAPI, action.data);
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data,
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
  return axios.post("/api/signup", data);
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
    // const res = yield call(followAPI, action.data);
    yield delay(1000);
    yield put({ type: FOLLOW_SUCCESS, data: action.data }); // put은 리듀서에 dispatch 하는 이펙트. 액션 객체가 들어간다.
  } catch (e) {
    yield put({ type: FOLLOW_FAILURE, error: e.response.data }); //에러는 여기에 담겨있다.
  }
}

// API(call 이펙트를 위해 굳이 분리해야 한다.)
const followAPI = (data) => {
  return axios.post("/api/follow", data);
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
    // const res = yield call(unFollowAPI, action.data);
    yield delay(1000);
    yield put({ type: UNFOLLOW_SUCCESS, data: action.data });
  } catch (e) {
    yield put({ type: UNFOLLOW_FAILURE, error: e.response.data });
  }
}
// API
const unFollowAPI = (data) => {
  return axios.post("/api/unfollow", data);
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
    // const res = yield call(changeNicknameAPI, action.data);
    yield delay(1000);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: action.data,
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
  return axios.post("/api/changenickname", data);
};
