import * as styles from "./LoginPage.style";
import Button from "@components/Button/Button";
import { useNavigate } from "react-router-dom";
import routes from "@constants/routes";
import usePostLogIn from "apis/hooks/users/userPostLogIn";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: postLogIn } = usePostLogIn();

  const isFormValid = email && password;

  const handleSignUp = () => {
    navigate(`${routes.signup}`);
  };

  return (
    <div css={styles.loginframe}>
      <div css={styles.logintext}>로그인</div>
      <div css={styles.contentStyle}>
        <div css={styles.logincheck}>
          <input
            css={styles.loginpw}
            placeholder="이메일"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <input
          css={styles.loginpw}
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text={"로그인"}
          type={"login"}
          className={!isFormValid ? "disabled" : ""}
          onClick={() => {
            if (isFormValid) {
              postLogIn(
                {
                  email,
                  password,
                },
                {
                  onSuccess: (res) => {
                    localStorage.setItem(
                      "accessToken",
                      res.data?.accessToken || ""
                    );

                    window.dispatchEvent(new Event("storage"));

                    navigate("/");
                  },
                  onError: (error) => {
                    alert("로그인 실패했습니다. 다시 시도해주세요.");
                    console.error(error);
                  },
                }
              );
            }
          }}
        />
        <div>
          <div css={styles.text}>또는</div>
        </div>

        <Button text={"회원가입"} type={"signup"} onClick={handleSignUp} />
      </div>
    </div>
  );
};

export default LoginPage;
