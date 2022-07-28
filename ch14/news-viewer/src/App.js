// 리액트 라우터 적용 예시
import { Route, Routes } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NewsPage />} />
      <Route path="/:category" element={<NewsPage />} />
    </Routes>
  );
};

export default App;

// // 간단한 뉴스 뷰어 UI, 한국 뉴스 가져와서 UI에 적용시키기
// import { useState, useCallback } from 'react';
// import NewsList from './components/NewsList';
// import Categories from './components/Categories';

// const App = () => {
//   const [category, setCategory] = useState('all'); // category 상태를 useState로 관리
//   const onSelect = useCallback((category) => setCategory(category), []); // category 값을 업데이트하는 함수
//   return (
//     <>
//       <Categories category={category} onSelect={onSelect} />
//       {/* category와 onSelct 함수를 Categories 컴포넌트에게 props로 전달*/}
//       <NewsList category={category} />
//       {/* category를 NewList 컴포넌트에게 props로 전달*/}
//     </>
//   );
// };
// export default App;

//  // 간단한 async/await  예제, 전체뉴스 불러오기 API 적용

// import { useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [data, setData] = useState(null);
//   // const onClick = () => {
//   //   axios
//   //     .get('https://jsonplaceholder.typicode.com/todos/1')
//   //     .then((response) => {
//   //       setData(response.data);
//   //     });
//   // };
//   const onClick = async () => {
//     // 위의 코드에 async/await 적용
//     try {
//       const response = await axios.get(
//         'https://newsapi.org/v2/top-headlines?country=kr&apiKey=c01822d3afac4eaabbced7ae8f254a9c',
//       );
//       setData(response.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   return (
//     <div>
//       <div>
//         <button onClick={onClick}>불러오기</button>
//       </div>
//       {data && (
//         <textarea
//           rows={7}
//           value={JSON.stringify(data, null, 2)}
//           readOnly={true}
//         />
//       )}
//     </div>
//   );
// };

// export default App;
