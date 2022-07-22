import { useRef, useCallback, useState } from "react";
import produce from "immer";

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: "", username: "" });
  const [data, setData] = useState({
    array: [],
    uselessValue: null,
  });

  // input 수정을 위한 함수
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      // immer 적용
      setForm(
        // produce(form, (draft) => {
        // useState의 함수형 업데이트와 immer 함께 쓰기
        produce((draft) => {
          draft[name] = value;
        })
      );

      // // 기존 코드
      // setForm({
      //   ...form,
      //   [name]: [value],
      // });
    },
    []
    // [form]
  );

  // form 등록을 위한 함수
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };
      // array에 새 항목 등록
      // immer 적용
      setData(
        // produce(data, (draft) => {
        // useState의 함수형 업데이트와 immer 함께 쓰기
        produce((draft) => {
          draft.array.push(info); // immer를 사용하여 컴포넌트 상태를 작성 시, 객체 안에 있는 값을 직접 수정하거나 배열에 직접적인 변화를 일으키는 push, splice 등의 함수를 사용해도 무방함
        })
      );
      // 기존 코드
      // setData({
      //   ...data,
      //   array: data.array.concat(info),
      // });

      // form 초기화
      setForm({
        name: "",
        username: "",
      });
      nextId.current += 1;
    },
    [form.name, form.username]
    // [data, form.name, form.username]
  );

  // 항목을 삭제하는 함수
  const onRemove = useCallback(
    (id) => {
      // immer 적용
      setData(
        // produce(data, (draft) => {
        // useState의 함수형 업데이트와 immer 함께 쓰기
        produce((draft) => {
          draft.array.splice(
            draft.array.findIndex((info) => info.id === id),
            1
          );
        })
      );
      // 기존 코드
      // setData({
      //   ...data,
      //   array: data.array.filter((info) => info.id !== id),
      // });
    },
    []
    // [data]
  );
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map((info) => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username}({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
