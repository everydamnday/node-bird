////////////////////////////////////////////// user 리듀서 ///////////////////////////////////////////

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
  followLoading: true, // 팔로우 로딩중
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
  Posts: [{ id: 1 }],
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
  switch (action.type) {
    //////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////// LOG_IN ///////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    case LOG_IN_REQUEST:
      return {
        ...state,
        logInLoading: true,
        logInDone: false,
        logInError: null,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        me: dummyUser(action.data),
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////// LOG_OUT ///////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////// SIGN_UP ///////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      };
    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////// FOLLOW ///////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    case FOLLOW_REQUEST:
      return {
        ...state,
        followLoading: true,
        followDone: false,
        followError: null,
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        followLoading: false,
        followDone: true,
      };
    case FOLLOW_FAILURE:
      return {
        ...state,
        followLoading: false,
        followError: action.error,
      };
    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////// UNFOLLOW //////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    case UNFOLLOW_REQUEST:
      return {
        ...state,
        unFollowLoading: true,
        unFollowDone: false,
        unFollowError: null,
      };
    case UNFOLLOW_SUCCESS:
      return {
        ...state,
        unFollowLoading: false,
        unFollowDone: true,
      };
    case UNFOLLOW_FAILURE:
      return {
        ...state,
        unFollowLoading: false,
        unFollowError: action.error,
      };
    ////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////// CHANGE_NICKNAME //////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    case CHANGE_NICKNAME_REQUEST:
      return {
        ...state,
        chgNickLoading: true,
        chgNickDone: false,
        chgNickError: null,
      };
    case CHANGE_NICKNAME_SUCCESS:
      return {
        ...state,
        chgNickLoading: false,
        chgNickDone: true,
        me: { ...action.data, nickname: "변경된 HAN" },
      };
    case CHANGE_NICKNAME_FAILURE:
      return {
        ...state,
        chgNickLoading: false,
        chgNickError: action.error,
      };
    ////////////////////////////////////////////////////////////////////////////////
    /////////////////////////// ADD_POST&REMOVE_POST ///////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    case ADD_POST_TO_ME:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: [...state.me.Posts, { id: action.data }],
        },
      };
    case REMOVE_POST_OF_ME:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: state.me.Posts.filter((v) => v.id !== action.data),
        },
      };
    default:
      return state;
  }
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
