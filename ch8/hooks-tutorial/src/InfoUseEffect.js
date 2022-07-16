import { useState, useEffect } from "react";

const InfoUseEffect = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  //   // useEffect 적용 예1 - 모든 렌더링에서 실행
  //   useEffect(() => {
  //     console.log("렌더링이 완료되었습니다!");
  //     console.log({
  //       name,
  //       nickname,
  //     });
  //   });

  //   // useEffect 적용 예2 - 마운트될 때만 실행(처음 렌더링 실행o, 업데이트 실행x 실행결과)
  //   // useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링 될 때만 실행하고,
  //   // 업데이트 될 때는 실행하지 않으려면 함수의 두 번째 파라미터로 비어있는 배열을 넣어주면 됨
  //   useEffect(() => {
  //     console.log("렌더링이 완료되었습니다!");
  //   }, []);

  //   // useEffect 적용 예3 - 특정 값이 변경될 때만 호출하고 싶은 경우
  //   // useEffect의 두 번째 파라미터로 전달되는 배열안에 검사하고 싶은 값을 넣어주면 됨
  //   // 배열 안에는 useState를 통해 관리하고 있는 상태를 넣어줘도 되고, props로 전달받은 값을 넣어줘도 됨
  //   useEffect(() => {
  //     console.log(name); // 여기선 props로 넘어온 값이 없으므로 useState를 통해 관리하고 있는 상태를 넣어줌
  //   }, [name]);

  // useEffect 적용 예4 - 뒷정리(cleanup) 함수
  // useEffect는 기본적으로 렌더링되고 난 직후마다 실행되며, 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라짐
  // 컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 수행하고 싶다면 useEffect에서 뒷정리(cleanup) 함수를 반환해주어야 함
  useEffect(() => {
    console.log("effect");
    console.log(name);
    return () => {
      console.log("cleanup");
      console.log(name);
    };
  }, [name]);

  //   // useEffect 적용 예4 번외 - 언마운트될 때만 뒷정리 함수를 호출하고 싶은 경우
  //   useEffect(() => {
  //     console.log("effect");
  //     return () => {
  //       console.log("unmount");
  //     };
  //   }, []);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeNickName = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickName} />
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

export default InfoUseEffect;
