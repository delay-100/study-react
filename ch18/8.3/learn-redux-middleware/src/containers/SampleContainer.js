import { connect } from "react-redux";
import Sample from "../components/Sample";
import { getPost, getUsers } from "../modules/sample";
import React from "react";

const { useEffect } = React;
const SampleContainer = ({
  getPost,
  getUsers,
  post,
  users,
  loadingPost,
  loadingUsers,
}) => {
  // 클래스 형태 컴포넌트였다면 componentDidMount 사용
  useEffect(() => {
    // sample 리듀서(modules/sample.js)에서 FAILURE 처리하지 않고 컨테이너 컴포넌트에서 하는 코드임.
    // useEffect에 파라미터로 넣는 함수는 async로 할 수 없기 때문에
    // 그 내부에서 async함수를 선언하고 호출함
    const fn = async () => {
      try {
        await getPost(1);
        await getUsers(1);
      } catch (e) {
        console.log(e); // 에러 조회
      }
    };
    fn();
    getPost(1);
    getUsers(1);
  }, [getPost, getUsers]);
  return (
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    />
  );
};

export default connect(
  ({ sample, loading }) => ({
    post: sample.post,
    users: sample.users,
    loadingPost: loading["sample/GET_POST"],
    loadingUsers: loading["sample/GET_USERS"],
    // loadingPost: sample.loading.GET_POST,
    // loadingUsers: sample.loading.GET_USERS,
  }),
  {
    getPost,
    getUsers,
  }
)(SampleContainer);
