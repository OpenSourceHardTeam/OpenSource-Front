import { css } from "@emotion/react";

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
  primary: "#7b9acc",
  darkText: "#0e2624",
  normalText: "#3f4756",
  lightText: "#666666",
  borderColor: "#d4d4d4",
};

// 페이지 타이틀
export const pageTitle = css`
  ${FontStyles.pretendardBold};
  color: ${Colors.primary};
  font-size: 40px;
  letter-spacing: 0;
  line-height: normal;
`;

// 책 제목
export const bookTitle = css`
  ${FontStyles.pretendardRegular};
  color: ${Colors.darkText};
  font-size: 30px;
  line-height: 29.9px;
`;

// 책 저자
export const bookAuthor = css`
  ${FontStyles.pretendardBold};
  color: ${Colors.normalText};
  font-size: 24px;
  line-height: 29.9px;
`;

// 출판사 정보
export const bookPublisher = css`
  ${FontStyles.pretendardRegular};
  color: ${Colors.lightText};
  font-size: 24px;
  line-height: normal;
`;

// 채팅방 타이틀
export const chatRoomTitle = css`
  ${FontStyles.pretendardExtraBold};
  color: ${Colors.normalText};
  font-size: 25px;
  line-height: normal;
`;

// 채팅방 설명
export const chatRoomDesc = css`
  ${FontStyles.pretendardRegular};
  color: ${Colors.normalText};
  font-size: 16px;
  line-height: normal;
`;

// 규칙 타이틀
export const rulesTitle = css`
  ${FontStyles.pretendardRegular};
  color: ${Colors.normalText};
  font-size: 16px;
  line-height: normal;
  margin-bottom: 5px;
`;

// 규칙 설명
export const rulesDesc = css`
  ${FontStyles.pretendardLight};
  color: ${Colors.normalText};
  font-size: 14px;
  line-height: normal;
`;

// 활성화된 탭
export const activeTab = css`
  ${FontStyles.pretendardMedium};
  color: ${Colors.normalText};
  font-size: 22px;
  line-height: normal;
  cursor: pointer;
`;

// 비활성화된 탭
export const inactiveTab = css`
  ${FontStyles.pretendardMedium};
  color: ${Colors.lightText};
  font-size: 22px;
  line-height: normal;
  cursor: pointer;
`;

// 섹션 타이틀
export const sectionTitle = css`
  ${FontStyles.pretendardBlack};
  color: ${Colors.darkText};
  font-size: 25px;
  line-height: normal;
`;

// 책 설명 텍스트
export const descriptionText = css`
  ${FontStyles.pretendardRegular};
  color: ${Colors.normalText};
  font-size: 16px;
  line-height: 20px;
  max-width: 515px;
`;

// 출판사 서평 텍스트
export const reviewText = css`
  ${FontStyles.pretendardRegular};
  color: ${Colors.normalText};
  font-size: 14px;
  line-height: 20px;
  max-width: 981px;
`;

// 버튼 텍스트
export const buttonText = css`
  ${FontStyles.pretendardSemiBold};
  color: #ffffff;
  font-size: 18px;
  text-align: center;
`;