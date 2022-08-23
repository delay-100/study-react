// 미들웨어: 함수를 반환하는 함수를 반환하는 함수
const loggerMiddleware = (store) => (next) => (action) => {
  // 미들웨어 기본 구조
  // 화살표 함수를 연달아 사용함
  // store: 리덕스 스토어 인스턴스, action: 디스패치 된 액션, next 파라미터: 함수형태. store.dispatch와 비슷한 역할
  // -> next파라미터와 store.dispatch의 차이점
  // next파라미터: next(action)을 호출하면 그 다음 처리해야 할 미들웨어에게 액션을 넘겨주고 만약 그다음 미들웨어가 없다면 리듀서에게 액션을 넘겨줌
  // store.dispatch: 스토어의 내장함수 dispatch 사용, dispatch의 파라미터로 액션 객체를 넣어줌 ex)store.dispatch(액션객체());
  // 미들웨어 내부에서 store.dispatch 사용 시 첫 번째 미들웨어부터 다시 처리를 시작하기때문에 액션이 리듀서에 전달되지 않음(액션이 무시됨)

  // 아래의 정보를 순차적으로 콘솔에 보여주는 미들웨어
  console.group(action && action.type); // 액션 타입으로 log를 그룹화함
  // 1. 이전 상태
  console.log("이전 상태", store.getState());
  // 2. 액션 정보
  console.log("액션", action);
  next(action); // 다음 미들웨어 혹은 리듀서에게 전달
  // 3. 새로워진 상태
  console.log("다음 상태", store.getState()); // 업데이트된 상태
  console.groupEnd(); // 그룹 끝
};

// // 위의 기본 loggerMiddleware는 아래의 코드와 같습니다.
// const loggerMiddleware = function loggerMiddleware(store) {
//     return function (next) {
//         return function(action) {
//             // 미들웨어 기본 구조
//         }
//     }
// }

export default loggerMiddleware;
