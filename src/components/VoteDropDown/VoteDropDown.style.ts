import { css } from "@emotion/react";

export const dropdownMenuStyle = css`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 160px;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #d4d4d4;
  border-radius: 16px;
  z-index: 10;
  padding: 8px 0;
`;

export const dropdownItemStyle = css`
  display: flex;
  padding: 1rem;
  font-size: 14px;
  font-weight: 600;
  align-self: center;
  justify-content: center;
  cursor: pointer;
`;

export const dropdownDeleteItemStyle = css`
  ${dropdownItemStyle};
  color: #de3412;
  font-weight: 600;
`;

export const dropdownDividerStyle = css`
  width: 100%;
  height: 1px;
  background-color: #d4d4d4;
  margin: 4px 0;
`;
