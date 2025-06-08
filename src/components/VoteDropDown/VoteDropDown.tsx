import {
  dropdownDeleteItemStyle,
  dropdownMenuStyle,
} from "./VoteDropDown.style";

interface DropDownProps {
  onDelete: () => void;
}

const VoteDropDown: React.FC<DropDownProps> = ({ onDelete }) => {
  return (
    <div css={dropdownMenuStyle}>
      <div css={dropdownDeleteItemStyle} onClick={onDelete}>
        삭제하기
      </div>
    </div>
  );
};

export default VoteDropDown;
