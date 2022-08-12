import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

export function useActions(actions, deps) {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        // 첫 번째 파라미터: 액션 생성 함수로 이루어진 배열
        return actions.map((a) => bindActionCreators(a, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    deps ? [dispatch, ...deps] : [dispatch], // 두 번째 파라미터: dispatch 배열 안에 들어 있는 원소가 바뀌면 액션을 디스패치하는 함수를 새로 만듦
  );
}
