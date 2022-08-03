// 1. 액션 타입 정의
// 액션 타입: 대문자, 문자열 내용: '모듈 이름/액션 이름' => 문자열 안에 모듈 이름을 넣어서 액션의 이름이 충돌되지 않게 함
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// 2. 액션 생성 함수 만들기
// 앞 부분에 export를 붙혀서 추후 이 함수를 다른 파일에서 불러와 사용할 수 있음
export const increase = () => ({ type: INCREASE }); // export: 여러 개를 내보낼 수 있음, export default: 한 개만 내보낼 수 있음
export const decrease = () => ({ type: DECREASE });

// 3. 초기 상태 및 리듀서 함수 만들기
// 3-1. 초기 상태 만들기 - number 값을 설정해줌
const initialState = {
  number: 0,
};

// 3-2. 리듀서 함수 만들기 - 현재 상태를 참조하여 새로운 객체를 생성해서 반환하는 코드
function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1,
      };
    case DECREASE:
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
}

export default counter; // export default: 한 개만 내보낼 수 있음, export: 여러 개를 내보낼 수 있음
// export default 불러오는 방식
// import counter from './counter';
// export 불러오는 방식
// import { increase, decrease }, './counter';
