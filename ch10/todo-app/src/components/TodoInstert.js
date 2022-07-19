import { MdAdd } from 'react-icons/md'; // import 아이콘이름 from 'react-icons-md';
// https://react-icons.netlify.com/#/icons/md 페이지에 들어가서 Material Design icons에서 아이콘이름을 고름
import './TodoInsert.scss';

const TodoInsert = () => {
  return (
    <form className="TodoInsert">
      <input placeholder="할 일을 입력하세요" />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
