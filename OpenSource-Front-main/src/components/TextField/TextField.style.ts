import styled from "@emotion/styled";

export const StyledTextarea = styled.textarea`
  line-height: 25.6px;
  width: 100%;
  height: 157px;
  resize: none;
  border-radius: 8px;
  border: 1px solid #dfe3e8;
  padding: 12px;
  font-size: 16px;
  font-weight: 400;
  color: #3f4756;
  margin-top: 17px;

  background-color: white;
  outline: none;

  &:focus {
    border-color: #3e83e9;
    background-color: white;
  }

  &::placeholder {
    color: #6d7882;
  }
`;
