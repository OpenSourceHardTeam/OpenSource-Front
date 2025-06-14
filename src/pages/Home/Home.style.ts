import { css } from "@emotion/react";

export const MainContainer = css`
  display: flex;
  flex-direction: column;
  gap: 80px;
  min-height: calc(100vh - 65px);
  width: 1040px;
  margin: 0 auto;
  padding: 80px 0px 100px 0px;
`;

export const Container = css`
  display: flex;
  flex-direction: column;
  font-size: 40px;
  font-weight: 700;
  color: #7b9acc;
  gap: 65px;
`;

export const ArrowButton = (
  position: "left" | "right",
  disabled: boolean
) => css`
  position: absolute;
  top: 50%;
  ${position}: 0px;
  transform: translateY(-70%);
  background: #7b9acc;
  border-radius: 50%;
  border: none;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  cursor: ${disabled ? "default" : "pointer"};
  opacity: ${disabled ? 0.3 : 1};
  pointer-events: ${disabled ? "none" : "auto"};
  transition: opacity 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

export const BookListWrapper = css`
  position: relative;
  display: flex;
  align-items: center;
`;

export const BookListContainer = css`
  display: flex;
  gap: 110px;
  padding: 0px 25px;
  justify-content: flex-start;
  overflow-x: auto;
  scroll-behavior: smooth;

  & > div {
    scroll-snap-align: start;
    flex: 0 0 auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const BookContainer = css`
  cursor: pointer;
  width: 165px;
  height: 310px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  color: #0e2624;
  font-size: 20px;
`;

export const imageStyle = css`
  height: 240px;
  width: 165px;
  object-fit: cover;
  display: block;
`;
export const TrendContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 60px;
`;

export const BookInfoWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 86px;
`;

export const BookImage = css`
  width: 206.75px;
  height: 300px;
  border-radius: 11px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const TitleAuthorWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

export const BookTitleText = css`
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  height: calc(1.3em * 2); // 또는 2.6em
`;

export const BookTitle = css`
  font-size: 30px;
  font-weight: 600;
  line-height: 1;
  color: #0e2624;
`;

export const BookAuthor = css`
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  color: #3f4756;
`;

export const BottomWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 45px;
`;

export const ParticipantText = css`
  font-size: 24px;
  font-weight: 400;
  color: #666666;
`;
