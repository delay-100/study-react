import { useState } from "react";

const IterationSample = () => {
  const [names, setNames] = useState([
    // 객체 형태로 이루어진 데이터 배열
    { id: 1, text: "눈사람" },
    { id: 2, text: "얼음" },
    { id: 3, text: "눈" },
    { id: 4, text: "바람" },
  ]);
  const [inputText, setInputText] = useState(""); // 텍스트를 입력할 수 있는 input
  const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 id

  const onChange = (e) => setInputText(e.target.value); //inputText(e.target.value) 값이 변할때마다 Set시켜줌

  // 추가 버튼 클릭 시 실행되는 함수
  const onClick = () => {
    const nextNames = names.concat({
      // concat은 아예 새로운 배열을 만들어줌 vs push는 기존 배열 자체를 변경해줌(리액트에서는 concat이 불변성 유지때문에 사용함)
      // 새로운 항목 추가 시 객체의 id값은 nextId를 사용
      id: nextId, // nextId 값을 id로 설정하고
      text: inputText,
    });
    setNextId(nextId + 1); // 클릭될 때마다 값이 1증가함(nextId값에 1을 더해준다.)
    setNames(nextNames); // names 값을 업데이트한다.
    setInputText(""); // 기존의 input 값인 inputText를 비운다.
  };

  // 더블클릭 시 실행되는 함수
  const onRemove = (id) => {
    const nextNames = names.filter((name) => name.id !== id); // 필터로 지정된 name의 id 값이랑 더블클릭된 name 값이 다른지 확인하고 다르면 필터에 저장(같으면 새로운 배열에 저장되지x)
    setNames(nextNames);
  };

  const nameList = names.map((name) => (
    <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
      {" "}
      {/*이름을 더블클릭하면 onRemove 함수 실행 */}
      {name.text}
    </li>
  ));
  return (
    <>
      <input value={inputText} onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{nameList}</ul>
    </>
  );

  // // 예시2 - 일반 문자열 배열의 값에 index key를 달아줌
  //   const names = ["눈사람", "얼음", "눈", "바람"];
  //   const nameList = names.map((name, index) => <li key={index}>{name}</li>);
  //   return <ul>{nameList}</ul>;

  // // 예시1 - 일반적인 리스트를 만드는 html 코드
  //   return (
  //     <ul>
  //       <li>눈사람</li>
  //       <li>얼음</li>
  //       <li>눈</li>
  //       <li>바람</li>
  //     </ul>
  //   );
};

export default IterationSample;
