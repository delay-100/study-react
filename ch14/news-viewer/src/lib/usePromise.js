import { useState, useEffect } from 'react';

// usePromise Hook: 대기 중, 완료 결과, 실패 결과에 대한 상태를 관리함
// usePromise의 의존 배열 deps를 파라미터로 받아옴
export default function usePromise(promiseCreator, deps) {
  // 대기 중/완료/실패에 대한 상태 관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();

    // deps 배열은 usePromise 내부에서 사용한 useEffect의 의존 배열로 설정되는데, 이 배열을 설정하는 부분에 ESLint 경고가 나타남. 아래의 주석은 ESLint 규칙을 비활성화 시키는 주석임
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [loading, resolved, error];
}
