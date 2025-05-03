import * as styles from "./SignUpPage.style";
import Button from "@components/Button/Button";
import { useNavigate } from "react-router-dom"

const SignUpPage = () => {

    const navigate = useNavigate();

    const onClickBackToLogin = () => {
        navigate("/login");
    };

  return (
    <div css={styles.signupframe}>
      <div css={styles.signuptext}>회원가입</div>
      <div css={styles.signupcheck}>
        <input css={styles.signupnickname} placeholder="닉네임" />
        <Button text={"중복확인"} type={"duplicate"} />
      </div>
      <div css={styles.signupcheck}>
        <input css={styles.signupid} placeholder="이메일" />
        <Button text={"인증하기"} type={"duplicate"} />
      </div>
      <input css={styles.signuppw} placeholder="비밀번호" />
      <input css={styles.signuppw} placeholder="비밀번호 확인" />
      <div css={styles.checkboxContainer}>
        <input type="checkbox" id="agree-checkbox" css={styles.signupcheckbox}/>
        <label htmlFor="agree-checkbox" css={styles.checkboxLabel}>이용약관 및 개인정보처리방침에 동의합니다</label>
      </div>
      <Button text={"로그인"} type={"login"} />
      <Button text={"가입하기"} type={"login"} />
      <div css={styles.backtologintext} onClick={onClickBackToLogin}>로그인 화면으로 돌아가기</div>
    </div>
  );
};

export default SignUpPage;
