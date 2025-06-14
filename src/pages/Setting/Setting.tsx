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
import { useEffect, useState } from "react";
import { Button } from "@components/index";
import {
  instruction,
  passwordBox,
  signuppw,
} from "pages/SignUpPage/SignUpPage.style";
import usePostNameExist from "apis/hooks/users/userPostNameExist";
import { useNavigate } from "react-router-dom";
import usePatchProfile from "apis/hooks/users/usePatchProfile";
import useGetUserInfo from "apis/hooks/users/useGetUserInfo";

const Setting: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: checkNameExist } = usePostNameExist();
  const { mutate: patchProfile } = usePatchProfile();

  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const isFormValid =
    nickname && password && passwordCheck && isNicknameChecked;

  const { data: userInfo } = useGetUserInfo();

  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.name);
      setEmail(userInfo.email);
      setIsNicknameChecked(true);
    }
  }, [userInfo]);
  const handleProfileUpdate = () => {
    if (!isFormValid) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    patchProfile(
      {
        newName: nickname.trim() || null,
        newPassword: password || null,
      },
      {
        onSuccess: () => {
          alert("수정이 완료되었습니다.");
          navigate("/");
        },
        onError: (error) => {
          console.error(error);
          alert("수정 중 오류가 발생했습니다.");
        },
      }
    );
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
  return (
    <div css={mainContainer}>
      <div css={container}>
        <p>개인정보 수정</p>
        <div css={profileContainer}>
          <img src={ProfileImage} css={imageStyle} />
          <div css={profileContent}>
            <div css={titleStyle}>
              <p>{email}</p>
            </div>
            <div css={signupcheck}>
              <input
                css={signupnickname}
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => {
                  const value = e.target.value;
                  setNickname(value);
                  setIsNicknameChecked(value === userInfo?.name);
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
                text={"수정하기"}
                type={"login"}
                className={!isFormValid ? "disabled" : ""}
                onClick={handleProfileUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
