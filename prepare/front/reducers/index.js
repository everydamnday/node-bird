import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import user from "./user";
import posts from "./posts";



const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE", action.payload);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  posts,
});

export default rootReducer;
