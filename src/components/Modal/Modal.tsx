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

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div css={Backdrop}>
      <div css={mainContainer}>
        <div css={topBox}>
          <CloseBtn css={iconStyle} onClick={onClose} />
        </div>
        <p css={titleStyle}>투표</p>
        <p>최대 30자까지 작성하실 수 있습니다.</p>
        <TextField />
        <div css={buttonContainer}>
          <Button text={"저장하기"} type={"login"} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
