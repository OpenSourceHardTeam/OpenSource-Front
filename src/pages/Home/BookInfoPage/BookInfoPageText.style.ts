import { css } from '@emotion/react';


// 공통 텍스트 스타일 정의
export const FontStyles = {
  pretendardSemiBold: css`
    font-family: "Pretendard-SemiBold", Helvetica;
    font-weight: 600;
  `,
  pretendardBold: css`
    font-family: "Pretendard-Bold", Helvetica;
    font-weight: 700;
  `,
  pretendardExtraBold: css`
    font-family: "Pretendard-ExtraBold", Helvetica;
    font-weight: 800;
  `,
  pretendardBlack: css`
    font-family: "Pretendard-Black", Helvetica;
    font-weight: 900;
  `,
  pretendardRegular: css`
    font-family: "Pretendard-Regular", Helvetica;
    font-weight: 400;
  `,
  pretendardMedium: css`
    font-family: "Pretendard-Medium", Helvetica;
    font-weight: 500;
  `,
  pretendardLight: css`
    font-family: "Pretendard-Light", Helvetica;
    font-weight: 300;
  `,
};

// 색상 정의
export const Colors = {
  primary: '#7b9acc',
  darkText: '#0e2624',
  normalText: '#3f4756',
  lightText: '#666666',
  borderColor: '#d4d4d4',
};

// 텍스트 관련 스타일 컴포넌트
export const BookInfoTextWrapper = css`
  position: absolute;
  width: 586px;
  height: 37px;
  top: 0;
  left: 0;
  ${FontStyles.pretendardBold};
  color: ${Colors.primary};
  font-size: 40px;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
`;

export const BookInfoTextWrapper2 = css`
  position: relative;
  align-self: stretch;
  height: 56px;
  margin-top: -1px;
  ${FontStyles.pretendardSemiBold};
  color: ${Colors.darkText};
  font-size: 30px;
  letter-spacing: 0;
  line-height: 29.9px;
`;

export const BookInfoTextWrapper3 = css`
  position: relative;
  align-self: stretch;
  height: 28px;
  ${FontStyles.pretendardBold};
  color: ${Colors.normalText};
  font-size: 24px;
  letter-spacing: 0;
  line-height: 29.9px;
  white-space: nowrap;
`;

export const BookInfoP = css`
  position: relative;
  align-self: stretch;
  ${FontStyles.pretendardRegular};
  color: ${Colors.lightText};
  font-size: 24px;
  letter-spacing: 0;
  line-height: normal;
`;

export const BookInfoTextWrapper4 = css`
  position: relative;
  width: 287px;
  height: 29px;
  margin-top: -1px;
  ${FontStyles.pretendardExtraBold};
  color: ${Colors.normalText};
  font-size: 25px;
  white-space: nowrap;
  letter-spacing: 0;
  line-height: normal;
`;

export const BookInfoTextWrapper5 = css`
  position: relative;
  align-self: stretch;
  height: 19px;
  ${FontStyles.pretendardRegular};
  color: ${Colors.normalText};
  font-size: 16px;
  white-space: nowrap;
  letter-spacing: 0;
  line-height: normal;
`;

export const BookInfoTextWrapper6 = css`
  position: relative;
  align-self: stretch;
  height: 87.36px;
  margin-top: -1px;
  ${FontStyles.pretendardRegular};
  color: ${Colors.normalText};
  font-size: 16px;
  letter-spacing: 0;
  line-height: normal;
`;

export const BookInfoTextWrapper7 = css`
  position: relative;
  align-self: stretch;
  height: 51px;
  margin-top: -60px;
  ${FontStyles.pretendardLight};
  color: ${Colors.normalText};
  font-size: 14px;
  letter-spacing: 0;
  line-height: normal;
`;

export const BookInfoTextWrapper9 = css`
  position: relative;
  width: 76px;
  height: 29px;
  margin-top: -1px;
  ${FontStyles.pretendardMedium};
  color: ${Colors.normalText};
  font-size: 22px;
  letter-spacing: 0;
  line-height: normal;
`;

export const BookInfoTextWrapper10 = css`
  position: relative;
  width: 49px;
  height: 29px;
  margin-top: -1px;
  ${FontStyles.pretendardMedium};
  color: ${Colors.lightText};
  font-size: 22px;
  letter-spacing: 0;
  line-height: normal;
`;

export const BookInfoTextWrapper11 = css`
  position: relative;
  width: 117px;
  height: 29px;
  margin-top: -1px;
  ${FontStyles.pretendardMedium};
  color: ${Colors.lightText};
  font-size: 22px;
  letter-spacing: 0;
  line-height: normal;
`;

export const BookInfoTextWrapper12 = css`
  position: relative;
  align-self: stretch;
  height: 27px;
  margin-top: -1px;
  ${FontStyles.pretendardBlack};
  color: ${Colors.darkText};
  font-size: 25px;
  white-space: nowrap;
  letter-spacing: 0;
  line-height: normal;
`;

export const BookInfoTextWrapper13_15 = css`
  position: absolute;
  width: 515px;
  top: 0;
  left: 0;
  ${FontStyles.pretendardRegular};
  color: ${Colors.normalText};
  font-size: 16px;
  letter-spacing: 0;
  line-height: 20px;
`;

export const BookInfoTextWrapper16 = css`
  position: relative;
  align-self: stretch;
  margin-top: -1px;
  ${FontStyles.pretendardBlack};
  color: ${Colors.darkText};
  font-size: 25px;
  letter-spacing: 0;
  line-height: normal;
`;

export const BookInfoTextWrapper17 = css`
  position: relative;
  width: 981px;
  height: 610px;
  ${FontStyles.pretendardRegular};
  color: ${Colors.normalText};
  font-size: 14px;
  letter-spacing: 0;
  line-height: 20px;
`;

export const BookInfoTextWrapper18 = css`
  position: relative;
  align-self: stretch;
  height: 22px;
  margin-top: -1px;
  ${FontStyles.pretendardBold};
  color: ${Colors.normalText};
  font-size: 20px;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
`;

// 버튼 텍스트 스타일
export const ButtonText = css`
  ${FontStyles.pretendardSemiBold};
  color: #ffffff;
  font-size: 18px;
  text-align: center;
`;
