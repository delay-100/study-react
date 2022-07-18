import classNames from "classnames/bind";
// import styles from "./CSSModule.module.css";
import styles from "./CSSModule.module.scss";

const cx = classNames.bind(styles); // classnames에 내장되어 있는 bind 함수를 사용하면 클래스를 넣어 줄 때마다 styles.[클래스 이름] 형태를 사용할 필요가 없습니다.
// 사전에 미리 styles에서 받아 온 후 사용하게끔 설정해두고, cx('클래스 이름', '클래스 이름2') 형태로 사용할 수 있습니다.

const CSSModule = () => {
  console.log(styles); // 출력결과 - wrapper: "CSSModule_wrapper__MKjbW / {wrapper: 'CSSModule_wrapper__MKjbW', inverted: 'CSSModule_inverted__YwyLv'}
  // CSS Module이 적용된 스타일 파일을 불러오면 객체를 전달받게 되는데 CSS Module에서 사용한 클래스 이름과 해당 이름을 고유화한 키-값이 형태로 들어있음
  // 파일이름: CSSModule, 클래스: wrapper, 해시값:MKjbW
  return (
    <div className={cx("wrapper", "inverted")}>
      {/* <div className={`${styles.wrapper} ${styles.inverted}`}> */}
      {/* className={[styles.wrapper, styles.inverted].join(' ')} 와 동일*/}
      안녕하세요, 저는 <span className="something">CSS Module!</span>
    </div>
  );
};

export default CSSModule;
