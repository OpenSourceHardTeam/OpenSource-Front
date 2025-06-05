import { CloseBtn } from "@assets/index";
import {
  Backdrop,
  buttonContainer,
  iconStyle,
  mainContainer,
  titleStyle,
  topBox,
} from "./Modal.style";
import TextField from "@components/TextField/TextField";
import Button from "@components/Button/Button";
import { useEffect, useState } from "react";
import usePostAddVote from "apis/hooks/vote/usePostAddVote";

interface ModalProps {
  onClose: () => void;
  bookId: number;
  refetchVotes: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, bookId, refetchVotes }) => {
  const [title, setTitle] = useState("");

  const { mutate: submitVote } = usePostAddVote();

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("투표 주제를 입력해주세요.");
      return;
    }

    submitVote(
      {
        bookId,
        title,
        content: `${title}에 대한 찬반 투표입니다.`,
      },
      {
        onSuccess: (res) => {
          if (res.code === 200) {
            alert("투표가 등록되었습니다.");
            refetchVotes();
            onClose();
          } else {
            alert(`등록 실패: ${res.message}`);
          }
        },
        onError: () => {
          alert("투표 등록 중 오류가 발생했습니다.");
        },
      }
    );
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div css={Backdrop}>
      <div css={mainContainer}>
        <div css={topBox}>
          <CloseBtn css={iconStyle} onClick={onClose} />
        </div>
        <p css={titleStyle}>투표</p>
        <p>최대 30자까지 작성하실 수 있습니다.</p>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="책에 대한 찬반 토론 주제를 작성해 주세요."
        />
        <div css={buttonContainer}>
          <Button text={"저장하기"} type="login" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
