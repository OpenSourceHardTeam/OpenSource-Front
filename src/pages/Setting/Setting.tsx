import { ProfileImage } from "@assets/index";
import {
  container,
  imageStyle,
  mainContainer,
  profileContainer,
  profileContent,
  signupcheck,
  signupnickname,
  titleStyle,
} from "./Setting.style";
import { useState } from "react";
import { Button } from "@components/index";
import {
  instruction,
  passwordBox,
  signuppw,
} from "pages/SignUpPage/SignUpPage.style";
import usePostNameExist from "apis/hooks/users/userPostNameExist";
import { useNavigate } from "react-router-dom";
import usePatchChangePassword from "apis/hooks/users/usePatchPassword";

const Setting: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: checkNameExist } = usePostNameExist();
  const { mutate: patchPassword } = usePatchChangePassword();

  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const isFormValid =
    nickname && password && passwordCheck && isNicknameChecked;

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
  return (
    <div css={mainContainer}>
      <div css={container}>
        <p>개인정보 수정</p>
        <div css={profileContainer}>
          <img src={ProfileImage} css={imageStyle} />
          <div css={profileContent}>
            <div css={titleStyle}>
              <p>stacycho0728@naver.com</p>
            </div>
            <div css={signupcheck}>
              <input
                css={signupnickname}
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
            <div css={passwordBox}>
              <input
                css={signuppw}
                placeholder="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div css={instruction}>
                비밀번호는 영문 대소문자, 숫자, 특수기호를 포함해야 합니다.
              </div>
            </div>
            <input
              css={signuppw}
              placeholder="비밀번호 확인"
              type="password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <div css={passwordBox}>
              <Button
                text={"가입하기"}
                type={"login"}
                className={!isFormValid ? "disabled" : ""}
                // onClick={() => {
                //   if (isFormValid) {
                //     postSignUp(
                //       {
                //         name: nickname,
                //         password,
                //       },
                //       {
                //         onSuccess: () => {
                //           alert("수정 완료");
                //           navigate("/");
                //         },
                //         onError: (error) => {
                //           alert("회원가입에 실패했습니다. 다시 시도해주세요.");
                //           console.error(error);
                //         },
                //       }
                //     );
                //   }
                // }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
