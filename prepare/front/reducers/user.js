////////////////////////////////////////////// user 리듀서 ///////////////////////////////////////////
import produce from "immer";

//////////////////////////////////////////////  초기값  //////////////////////////////////////////////

const initialState = {
  logInLoading: false, // 로그인 로딩중
  logInDone: false, // 로그인 완료
  logInError: null, // 로그인 에러
  logOutLoading: false, // 로그아웃 로딩중
  logOutDone: false, // 로그아웃 완료
  logOutError: null, // 로그아웃 에러
  signUpLoading: false, // 회원가입 로딩중
  signUpDone: false, // 회원가입 완료
  signUpError: null, // 회원가입 에러
  followLoading: false, // 팔로우 로딩중
  followDone: false, // 팔로우 완료
  followError: null, // 팔로우 에러
  unFollowLoading: false, // 언팔로우 로딩중
  unFollowDone: false, // 언팔로우 완료
  unFollowError: null, // 언팔로우 에러
  chgNickLoading: false, // 닉네임 변경 로딩중
  chgNickDone: false, // 닉네임 변경 완료
  chgNickError: null, // 닉네임 변경 에러
  me: null, // 유저 데이터
  signUpData: {}, // 회원가입 입력값
  loginData: {}, // 로그인 입력값
};

//////////////////////////////////////////////  액션 변수  //////////////////////////////////////////////

// LOG_IN
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
// LOG_OUT
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";
// SIGN_UP
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
// FOLLOW
export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";
// UNFOLLOW
export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";
// CHANGE_NICKNAME
export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";
// ADD_POST&REMOVE_POST(post연동)
export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

const dummyUser = (data) => ({
  ...data,
  nickname: "HAN_dummy",
  id: 1,
  Posts: [],
  Followings: [
    { nickname: "나까무라" },
    { nickname: "스즈키" },
    { nickname: "히로시" },
  ],
  Followers: [
    { nickname: "나까무라" },
    { nickname: "스즈키" },
    { nickname: "히로시" },
  ],
});

//////////////////////////////////////////////  액션 크리에이터  //////////////////////////////////////////////

////////////   LOG_IN 액션 크리에이터   ////////////
export const logInRequestAction = (data) => {
  console.log(data);
  return { type: LOG_IN_REQUEST, data };
};
////////////   LOG_OUT 액션 크리에이터   ////////////
export const logOutRequestAction = () => {
  return { type: LOG_OUT_REQUEST };
};
////////////   SIGN_UP 액션 크리에이터   ////////////
export const signUpRequestAction = (data) => {
  console.log(data);
  return { type: SIGN_UP_REQUEST, data };
};
////////////   FOLLOW 액션 크리에이터   ////////////
export const followRequestAction = (data) => {
  return { type: FOLLOW_REQUEST, data };
};
////////////  UNFOLLOW 액션 크리에이터  ////////////
export const unFollowRequestAction = (data) => {
  return { type: UNFOLLOW_REQUEST, data };
};
////////////  CHANGE_NICKNAME 액션 크리에이터 ////////////
export const chgNickRequestAction = (data) => {
  console.log(data);
  return { type: CHANGE_NICKNAME_REQUEST, data };
};

///////////////////////////////////////  리듀서  ///////////////////////////////////

const user = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      //////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////// LOG_IN ///////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = dummyUser(action.data);
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      //////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////// LOG_OUT ///////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      //////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////// SIGN_UP ///////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      //////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////// FOLLOW ///////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings.push({ id: action.data });
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      //////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////// UNFOLLOW //////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      case UNFOLLOW_REQUEST:
        draft.unFollowLoading = true;
        draft.unFollowDone = false;
        draft.unFollowError = null;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unFollowLoading = false;
        draft.unFollowDone = true;
        draft.me.Followings = draft.me.Followings.filter(
          (v) => v.id !== action.data
        );
        break;
      case UNFOLLOW_FAILURE:
        draft.unFollowLoading = false;
        draft.unFollowError = action.error;
        break;
      ////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////// CHANGE_NICKNAME //////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      case CHANGE_NICKNAME_REQUEST:
        draft.chgNickLoading = true;
        draft.chgNickDone = false;
        draft.chgNickError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.chgNickLoading = false;
        draft.chgNickDone = true;
        draft.me.nickname = "변경된 HAN";
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.chgNickLoading = false;
        draft.chgNickError = action.error;
        break;
      ////////////////////////////////////////////////////////////////////////////////
      /////////////////////////// ADD_POST&REMOVE_POST ///////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
        break;
      default:
        break;
    }
  });
};

export default user;

// //Thunk 미들웨어 (예)
// const LoginRequest = (data) => {
//   return ({ dispatch, getState }) => {
//     dispatch(loginRequestAction());
//     try {
//       const res = axios.post("/api/login");
//       dispatch(loginSuccessAction(res.data));
//     } catch (e) {
//       dispatch(loginFailureAction(e));
//     }
//   };
// };

// 로그인 액션 크리에이터     사가에서 크리에이트 대체
// export const loginSuccessAction = (data) => {
//   console.log(data);
//   return { type: "LOG_IN_SUCCESS", data };
// };

// export const loginFailureAction = (data) => {
//   console.log(data);
//   return { type: "LOG_IN_FAILURE", data };
// };

// 로그아웃 액션 크리에이터   사가에서 크리에이트 대체
// export const logoutSuccessAction = () => {
//   return { type: "LOG_OUT_SUCCESS" };
// };

// export const logoutFailureAction = () => {
//   return { type: "LOG_OUT_FAILURE" };
// };
