////////////////////////////////////////////// posts 리듀서 ///////////////////////////////////////////
import shortId from "shortid";

//////////////////////////////////////////////  초기값  //////////////////////////////////////////////
const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "HAN",
      },
      content: "첫번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          id: shortId.generate(),
          src:
            "https://cdn.pixabay.com/photo/2021/02/08/16/03/dinosaur-5995333_960_720.png",
        },
        {
          id: shortId.generate(),
          src:
            "https://cdn.pixabay.com/photo/2021/02/08/16/03/dinosaur-5995334_960_720.png",
        },
        {
          id: shortId.generate(),
          src:
            "https://cdn.pixabay.com/photo/2021/02/08/16/03/dinosaur-5995332_960_720.png",
        },
        {
          id: shortId.generate(),
          src:
            "https://cdn.pixabay.com/photo/2021/02/08/16/03/dinosaur-5995333_960_720.png",
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: "나까무라",
          },
          content: "나까무라 상 아리가또",
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: "나까무라",
          },
          content: "나까무라 상 아리가또",
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: "나까무라",
          },
          content: "나까무라 상 아리가또",
        },
      ],
      imagePaths: [],
      addPostLoading: false,
      addPostDone: false,
      addPostError: false,
      removePostLoading: true,
      removePostDone: false,
      removePostError: null,
      addCommentLoading: true,
      addCommentDone: false,
      addCommentError: null,
    },
  ],
};

//////////////////////////////////////////////  액션 변수  //////////////////////////////////////////////

// 포스트 게시
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
// 코멘트 게시
export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";
// 게시글 삭제
export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

//////////////////////////////////////////////  액션 크리에이터  //////////////////////////////////////////////

export const addPostRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addCommentRequestAction = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

export const removePostRequestAction = (data) => ({
  type: REMOVE_POST_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: "Han",
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data.content,
  User: {
    id: 1,
    nickname: "나까무라",
  },
});

///////////////////////////////////////  리듀서  ////////////////////////////////////

const posts = (state = initialState, action) => {
  switch (action.type) {
    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////// ADD_POST ///////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        mainPosts: [...state.mainPosts, dummyPost(action.data)],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////// REMOVE_POST ///////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        removePostLoading: false,
        removePostDone: true,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////// ADD_COMMENT /////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS: {
      console.log(action.data, "post reducer");
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.data.postId
      );
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [...post.Comments, dummyComment(action.data)];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default posts;
