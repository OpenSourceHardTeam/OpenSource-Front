import * as styles from "./LoginPage.style";
import { line } from "@assets/img";
import Button from "@components/Button/Button";

const LoginPage = () => {
  return (
    <div css={styles.loginframe}>
      <div css={styles.logintext}>로그인</div>
      <div css={styles.logincheck}>
        <input css={styles.loginid} placeholder="아이디" />
        <Button text={"중복확인"} type={"duplicate"} />
      </div>
      <input css={styles.loginpw} placeholder="비밀번호" />
      <Button text={"로그인"} type={"login"} />
      <div>
        <img src={line} />
        <div css={styles.text}>또는</div>
        <img src={line} />
      </div>

      <Button text={"회원가입"} type={"signup"} />
    </div>
  );
};

export default LoginPage;
