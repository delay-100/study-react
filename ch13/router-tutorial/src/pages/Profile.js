import { useParams } from "react-router-dom";

const data = {
  // data 객체에 예시 프로필 정보들을 key-value 형태로 담아둠
  delay100: {
    name: "백지연",
    description: "리액트를 좋아하는 개발자",
  },
  gildong: {
    name: "홍길동",
    description: "고전 소설 홍길동전의 주인공",
  },
};

const Profile = () => {
  // URL 파라미터는 useParams라는 Hook을 사용하여 객체 형태로 조회할 수 있습니다.
  // URL 파라미터 이름은 라우트 설정을 할 때 Route 컴포넌트의 path props를 통해 설정합니다.
  const params = useParams();
  const profile = data[params.username];

  //   username URL 파라미터를 통해 프로필을 조회한 뒤에

  return (
    <div>
      <h1>사용자 프로필</h1>
      {/* 프로필이 존재하면 프로필 정보를 보여줌, 프로필이 존재하지 않으면 '존재하지 않는 프로필입니다'라는 문구를 보여줌 */}
      {profile ? (
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.description}</p>
        </div>
      ) : (
        <p>존재하지 않는 프로필입니다.</p>
      )}
    </div>
  );
};

export default Profile;
