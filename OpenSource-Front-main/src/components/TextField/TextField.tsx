// components/TextField/TextField.tsx
import { StyledTextarea } from "./TextField.style";

interface TextFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxLength?: number;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  onChange,
  placeholder,
  maxLength = 50,
}) => {
  return (
    <StyledTextarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
};

export default TextField;
