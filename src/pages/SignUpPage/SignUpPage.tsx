import * as styles from "./SignUpPage.style";
import Button from "@components/Button/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePostSignUp from "apis/hooks/users/userPostSignUp";
import usePostEmail from "apis/hooks/users/userValidationPostEmail";
import usePostSendEmail from "apis/hooks/users/userPostSendEmail";
import usePostEmailExist from "apis/hooks/users/userPostEmailExist";
import usePostNameExist from "apis/hooks/users/userPostNameExist";

const SignUpPage = () => {
  const navigate = useNavigate();

  const { mutate: postSignUp } = usePostSignUp();
  const { mutate: postEmailValidation } = usePostEmail();
  const { mutate: sendEmail } = usePostSendEmail();
  const { mutate: checkEmailExist } = usePostEmailExist();
  const { mutate: checkNameExist } = usePostNameExist();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [showAuthSection, setShowAuthSection] = useState(false);
  const [timer, setTimer] = useState(300);

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
    navigate("/");
  };

  const onClickNicknameCheck = () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    checkNameExist(
      { name: nickname.trim() },
      {
        onSuccess: (res) => {
          if (Number(res.code) === 200) {
            alert("사용 가능한 닉네임입니다.");
            setIsNicknameChecked(true);
          } else {
            alert("이미 존재하는 닉네임입니다.");
            setIsNicknameChecked(false);
          }
        },
        onError: () => {},
      }
    );
  };

  const onClickSendAuthCode = () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    checkEmailExist(
      { email },
      {
        onSuccess: (res) => {
          if (Number(res.code) === 200) {
            sendEmail(
              { email },
              {
                onSuccess: (res) => {
                  alert(res.message || "인증번호가 이메일로 발송되었습니다.");
                  setShowAuthSection(true);
                  setTimer(300);
                },
                onError: () => {
                  alert("이메일 발송에 실패했습니다.");
                },
              }
            );
          } else {
            alert("이미 등록된 이메일입니다.");
          }
        },
      }
    );
  };

  const onClickEmailVerify = () => {
    if (!email || !authCode) {
      alert("이메일과 인증번호를 모두 입력해주세요.");
      return;
    }

    postEmailValidation(
      {
        email: email.trim(),
        authCode: authCode.toString().trim(),
      },
      {
        onSuccess: (response) => {
          if (Number(response.code) === 200) {
            setIsEmailVerified(true);
            setShowAuthSection(false);
            setTimer(0);
          } else {
            alert(response.data?.message || "인증번호가 올바르지 않습니다.");
          }
        },

        onError: () => {},
      }
    );
  };

  useEffect(() => {
    if (showAuthSection && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [showAuthSection, timer]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div css={styles.signupframe}>
      <div css={styles.signuptext}>회원가입</div>
      <div css={styles.signupContainer}>
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
        <div css={styles.instruction}>닉네임은 2-10자 이내로 입력해주세요.</div>
      </div>
      <div css={styles.signupContainer}>
        <div css={styles.signupcheck}>
          <input
            css={styles.signupid}
            placeholder="이메일"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailVerified(false);
              setShowAuthSection(false);
            }}
          />
          <Button
            text="인증 요청"
            type="duplicate"
            onClick={onClickSendAuthCode}
          />
        </div>
        {isEmailVerified && (
          <div
            css={{
              fontSize: "14px",
              color: "#3cb371",
              fontWeight: "600",
              marginTop: "4px",
            }}
          >
            인증이 완료되었습니다.
          </div>
        )}
      </div>

      {showAuthSection && (
        <div css={styles.signupContainer}>
          <div css={styles.signupcheck}>
            <input
              css={styles.signupid}
              placeholder="이메일 인증번호"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
            />
            <Button
              text="인증하기"
              type="duplicate"
              onClick={onClickEmailVerify}
            />
          </div>
          <div css={{ fontSize: "14px", color: "#7B9ACC", fontWeight: "600" }}>
            남은 시간: {formatTime(timer)}
          </div>
        </div>
      )}
      <div css={styles.passwordBox}>
        <input
          css={styles.signuppw}
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div css={styles.instruction}>
          비밀번호는 영문 대소문자, 숫자, 특수문자를 포함하여 5자 이상 10자
          이내로 설정해주세요.
        </div>
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
                  alert("회원가입 완료");

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
