////////////////////////////////////////////// posts 리듀서 ///////////////////////////////////////////
import shortId from "shortid";
import faker from "faker";
import produce from "immer";

//////////////////////////////////////////////  초기값  //////////////////////////////////////////////
const initialState = {
  mainPosts: [
    // {
    //   id: 1,
    //   User: {
    //     id: 1,
    //     nickname: "HAN",
    //   },
    //   content: "첫번째 게시글 #해시태그 #익스프레스",
    //   Images: [
    //     {
    //       id: shortId.generate(),
    //       src:
    //         "https://cdn.pixabay.com/photo/2021/02/08/16/03/dinosaur-5995333_960_720.png",
    //     },
    //     {
    //       id: shortId.generate(),
    //       src:
    //         "https://cdn.pixabay.com/photo/2021/02/08/16/03/dinosaur-5995334_960_720.png",
    //     },
    //     {
    //       id: shortId.generate(),
    //       src:
    //         "https://cdn.pixabay.com/photo/2021/02/08/16/03/dinosaur-5995332_960_720.png",
    //     },
    //     {
    //       id: shortId.generate(),
    //       src:
    //         "https://cdn.pixabay.com/photo/2021/02/08/16/03/dinosaur-5995333_960_720.png",
    //     },
    //   ],
    //   Comments: [
    //     {
    //       id: shortId.generate(),
    //       User: {
    //         id: shortId.generate(),
    //         nickname: "나까무라",
    //       },
    //       content: "나까무라 상 아리가또",
    //     },
    //     {
    //       id: shortId.generate(),
    //       User: {
    //         id: shortId.generate(),
    //         nickname: "나까무라",
    //       },
    //       content: "나까무라 상 아리가또",
    //     },
    //     {
    //       id: shortId.generate(),
    //       User: {
    //         id: shortId.generate(),
    //         nickname: "나까무라",
    //       },
    //       content: "나까무라 상 아리가또",
    //     },
    //   ],  // generateDummyPost의 실험을 위해 숨겨둔다.
    // },
  ],
  imagePaths: [],
  hasMorePost: true, // 더 가져올 포스트가 있는지 여부(50개 미만일 때만 true)
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: false,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: true,
  addCommentDone: false,
  addCommentError: null,
};

// faker 더미데이터 크리에이터
export const generateDummyPost = (number) => {
  return initialState.mainPosts.concat(
    Array(number)
      .fill()
      .map((v, i) => ({
        id: shortId.generate(),
        User: { id: shortId.generate(), nickname: faker.name.findName() },
        content: faker.lorem.paragraph(),
        Images: [{ src: faker.image.image() }],
        Comments: [
          {
            id: shortId.generate(),
            User: { id: shortId.generate(), nickname: faker.name.findName() },
            content: faker.lorem.sentence(),
          },
        ],
      }))
  );
};

//////////////////////////////////////////////  액션 변수  //////////////////////////////////////////////

// 포스트 불러오기
export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

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
  return produce(state, (draft) => {
    switch (action.type) {
      //////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////// LOAD_POST ///////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePost = action.data.concat(draft.mainPosts).length <= 50;
        // draft.mainPosts.unshift(dummyPost(action.data));
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      //////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////// ADD_POST ///////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(dummyPost(action.data));
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////// REMOVE_POST ///////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////// ADD_COMMENT /////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data));
        // 불변성 지키는 문법...
        // console.log(action.data, "post reducer");
        // const postIndex = state.mainPosts.findIndex(
        //   (v) => v.id === action.data.postId
        // );
        // const post = { ...state.mainPosts[postIndex] };
        // post.Comments = [...post.Comments, dummyComment(action.data)];
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = post;
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
};

export default posts;
