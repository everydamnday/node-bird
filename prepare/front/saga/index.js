import { all, fork } from "redux-saga/effects";
import userSaga from "./user";
import postSaga from "./posts";

// root사가
export default function* rootSaga() {
  yield all([
    fork(userSaga), //fork(take("LOG_IN_REQUEST", login)) 으로 바로 써도 된다.
    fork(postSaga),
  ]);
}

// 데이터 flow
// 0 - useEffect 같은데서, dispatch(watchLogin(data)) 로 실행
// 감지(액션감지 및 핸들러 매칭)
// 1 - fork(watchLogin)     리스너가 감지
// 2 - watchLogin() { yield take("LOG_IN", login) }   리스너에 의해 실행된 핸들러가 해당 액션을 자동으로 login에 전달
// 실행(액션을 받아서 처리)
// 3 - login(action) { try { const res = yield call(loginAPI, action.data) }}   액션 인자를 받아서 call에 두번째 매개변수로 전달.
// 4 - loginAPI(data) {return axios.post("/api/login", data)}       call 안에 전달된 data가 그대로 전달
