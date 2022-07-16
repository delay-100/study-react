import { useReducer } from "react";

function reducer(state, action) {
  // action은 그 어떤 값도 사용 가능합니다. 그래서 이번에는 이벤트 객체가 지니고 있는 e.target 값 자체를 action 값으로 사용했습니다.
  // 이런 식으로 input을 관리하면 아무리 input의 개수가 많아져도 코드를 짧고 깔끔하게 유지할 수 있습니다.
  return {
    ...state,
    [action.name]: action.value,
  };
}

const InfoUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, {
    // reducer의 첫 번째 파라미터: 리듀서 함수, 두 번째 파라미터: 해당 리듀서의 기본 값
    // state(현재 가리키고 있는 상태) 값과 dispatch 함수(액션을 발생시키는 함수)를 받아옴
    // dispatch(action)과 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어 주면 리듀서 함수가 호출되는 구조

    name: "",
    nickname: "",
  });
  const { name, nickname } = state;

  const onChange = (e) => {
    dispatch(e.target);
  };

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default InfoUseReducer;
