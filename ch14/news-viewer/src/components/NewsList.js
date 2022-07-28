// NewsList 컴포넌트: API를 요청하고 뉴스 데이터가 들어 있는 배열을 컴포넌트 배열로 변환하여 렌더링해 주는 컴포넌트
// import { useState, useEffect } from 'react'; // usePromise 미사용시 사용
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

// NewsList 컴포넌트에서 현재 props로 받아 온 category에 따라 카테고리를 지정하여 API 요청
const NewsList = ({ category }) => {
  // // 아래의 주석부분은 usePromise 적용 전 코드
  //   const [articles, setArticles] = useState(null);
  //   const [loading, setLoading] = useState(false); // loading이라는 상태도 관리하여 API 요청이 대기 중인지 판별함

  //   // 컴포넌트가 화면에 보이는 시점에 api를 요청
  //   // useEffect를 사용해 컴포넌트가 처음 렌더링되는 시점에 API를 요청하면 됩니다.
  //   // 주의할 점: useEffect에 등록하는 함수에 async를 붙이면 안 됨!! => useEffect에서 반환해야 하는 값은 뒷정리 함수이기 때문
  //   // useEffect 내부에서 async/await를 사용하고 싶다면 함수 내부에 async 키워드가 붙은 또다른 함수를 만들어서 사용해줘야 합니다.
  //   useEffect(() => {
  //     // async를 사용하는 함수 따로 선언
  //     const fetchData = async () => {
  //       setLoading(true); // 요청이 대기 중일때는 loading 값이 true가 됨
  //       try {
  //         const query = category === 'all' ? '' : `&category=${category}`; // category값이 all 이라면 공백으로 설정, all이 아니면 "&category=카테고리" 형태의 문자열을 만들도록 함
  //         const response = await axios.get(
  //           `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=c01822d3afac4eaabbced7ae8f254a9c`, //API 요청 시 주소에 query값 포함시킴
  //         );
  //         setArticles(response.data.articles);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //       setLoading(false); // 요청이 끝나면 loading값이 false값이 됨
  //     };
  //     fetchData();
  //   }, [category]); // category 값이 바뀔 때마다 뉴스를 새로 불러와야 하기 때문에 useEffect의 의존 배열(두 번째 파라미터로 설정하는 배열)에 category를 넣어줘야 함

  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=c01822d3afac4eaabbced7ae8f254a9c`,
    );
  }, [category]);

  // 대기 중일 때
  if (loading) {
    return <NewsListBlock>대기 중..</NewsListBlock>;
  }

  // 아직 response(articles) 값이 설정되지 않았을 때
  // map 함수를 사용하기 전에 꼭 !articles를 조회하여 해당 값이 현재 null이 아닌지 검사해야 함.
  // 만약 데이터가 없다면 null에는 map 함수가 없기때문에 렌더링 과정에서 오류가 발생 => 애플리케이션이 제대로 나타나지 않고 흰 페이지만 보임
  if (!response) {
    // usePromise 미사용시 articles로 변경
    return null;
  }

  if (error) {
    return <NewsListBlock>에러 발생!</NewsListBlock>;
  }
  // articles 값이 유효할 때
  const { articles } = response.data;
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );

  // // 아직 데이터를 불러오지 않고 샘플 데이터를 넣어줌
  // const sampleArticle = {
  //     title: '제목',
  //     description: '내용',
  //     url: 'https://google.com',
  //     urlToImage: 'https://via.placeholder.com/160',
  //   };

  //   return (
  //     <NewsListBlock>
  //       <NewsItem article={sampleArticle} />
  //       <NewsItem article={sampleArticle} />
  //       <NewsItem article={sampleArticle} />
  //       <NewsItem article={sampleArticle} />
  //       <NewsItem article={sampleArticle} />
  //       <NewsItem article={sampleArticle} />
  //     </NewsListBlock>
  //   );
};

export default NewsList;
