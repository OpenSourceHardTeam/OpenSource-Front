import * as styles from "./SignUpPage.style";
import Button from "@components/Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePostSignUp from "apis/hooks/users/userPostSignUp";

const SignUpPage = () => {
  const navigate = useNavigate();

  const { mutate: postSignUp } = usePostSignUp();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const isFormValid =
    nickname &&
    email &&
    password &&
    passwordCheck &&
    isNicknameChecked &&
    isEmailVerified;

  const onClickBackToHome = () => {
    navigate("/home");
  };

  const onClickNicknameCheck = () => {
    setIsNicknameChecked(true);
  };

  const onClickEmailVerify = () => {
    setIsEmailVerified(true);
  };

  return (
    <div css={styles.signupframe}>
      <div css={styles.signuptext}>회원가입</div>
      <div css={styles.signupcheck}>
        <input
          css={styles.signupnickname}
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            setIsNicknameChecked(false);
          }}
        />
        <Button
          text={"중복확인"}
          type={"duplicate"}
          onClick={onClickNicknameCheck}
        />
      </div>
      <div css={styles.signupcheck}>
        <input css={styles.signupid} placeholder="이메일" />
        <Button text={"인증하기"} type={"duplicate"} />
      </div>
      <input
        css={styles.signuppw}
        placeholder="비밀번호 확인"
        type="password"
        value={passwordCheck}
        onChange={(e) => setPasswordCheck(e.target.value)}
      />
      <Button
        text={"가입하기"}
        type={"login"}
        className={!isFormValid ? "disabled" : ""}
        onClick={() => {
          if (isFormValid) {
            postSignUp(
              {
                name: nickname,
                email,
                password,
              },
              {
                onSuccess: () => {
                  navigate("/login");
                },
                onError: (error) => {
                  alert("회원가입에 실패했습니다. 다시 시도해주세요.");
                  console.error(error);
                },
              }
            );
          }
        }}
      />
      <div css={styles.backtologintext} onClick={onClickBackToHome}>
        홈 화면으로 돌아가기
      </div>
    </div>
  );
};

export default SignUpPage;
