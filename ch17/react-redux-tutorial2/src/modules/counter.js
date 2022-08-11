// 7 - 추가내용. redux-actions 라이브러리 사용하기
import { createAction, handleActions } from 'redux-actions';

// 1. 액션 타입 정의
// 액션 타입: 대문자, 문자열 내용: '모듈 이름/액션 이름' => 문자열 안에 모듈 이름을 넣어서 액션의 이름이 충돌되지 않게 함
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// 2. 액션 생성 함수 만들기
// redux-actions 라이브러리 中 createAction 사용한 경우
export const increase = createAction(INCREASE); // createAction: 매번 객체를 직접 만들어 줄 필요 없이 더욱 간단하게 액션 함수 선언 가능
export const decrease = createAction(DECREASE);
// 아래는 redux-actions 라이브러리를 사용하지 않았을 때의 코드임
// 앞 부분에 export를 붙혀서 추후 이 함수를 다른 파일에서 불러와 사용할 수 있음
// export const increase = () => ({ type: INCREASE }); // export: 여러 개를 내보낼 수 있음, export default: 한 개만 내보낼 수 있음
// export const decrease = () => ({ type: DECREASE });

// 3. 초기 상태 및 리듀서 함수 만들기
// 3-1. 초기 상태 만들기 - number 값을 설정해줌
const initialState = {
  number: 0,
};

// 3-2. 리듀서 함수 만들기 - 현재 상태를 참조하여 새로운 객체를 생성해서 반환하는 코드
// redux-actions 라이브러리 中 리듀서 함수도 더 간단하게 만들기
const counter = handleActions(
  // handleActions 함수 - 첫 번째 파라미터: 각 액션에 대한 업데이트 함수, 두 번째 파라미터: 초기 상태
  // 가독성이 올라감
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState,
);
// 아래는 redux-actions 라이브러리를 사용하지 않았을 때의 코드임
// function counter(state = initialState, action) {
//   switch (action.type) {
//     case INCREASE:
//       return {
//         number: state.number + 1,
//       };
//     case DECREASE:
//       return {
//         number: state.number - 1,
//       };
//     default:
//       return state;
//   }
// }

export default counter; // export default: 한 개만 내보낼 수 있음, export: 여러 개를 내보낼 수 있음
// export default 불러오는 방식
// import counter from './counter';
// export 불러오는 방식
// import { increase, decrease }, './counter';
