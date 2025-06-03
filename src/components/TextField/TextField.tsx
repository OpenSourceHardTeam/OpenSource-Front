import { StyledTextarea } from "./TextField.style";

const TextField = () => {
  return (
    <StyledTextarea
      maxLength={30}
      placeholder="책에 대한 찬반 토론 주제를 작성해 주세요."
    />
  );
};

export default TextField;
