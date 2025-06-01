import { containerStyle, dropdownStyle } from "./DropDown.style";
import { Link } from "react-router-dom";
import routes from "@constants/routes";
interface ProfileDropdownProps {
  onClose: () => void;
}
const Dropdown: React.FC<ProfileDropdownProps> = ({ onClose }) => {
  const handleLogout = () => {
    onClose();
  };

  return (
    <div css={dropdownStyle}>
      <Link to={routes.setting} css={containerStyle(true)} onClick={onClose}>
        설정
      </Link>
      <div onClick={handleLogout} css={containerStyle(false)}>
        로그아웃
      </div>
    </div>
  );
};

export default Dropdown;
