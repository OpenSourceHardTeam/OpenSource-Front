// import React from 'react';
import { css } from '@emotion/react';
import Bar from "../../../components/Bar/Bar.tsx";
import Button from "../../../components/Button/Button.tsx";
import * as layoutStyles from "./BookInfoPage.style.ts";
import * as textStyles from "./BookInfoPageText.style.ts";
import image5 from "../../../assets/img/image 5.png";
import Line from "../../../assets/img/Vector.png";

const BD = {
    image: image5,
    title: "소년이 온다",
    author: "한강",
    publisher: "창비",
    published: "2014년 5월 19일",
    book_description: `이 책은 현대 문학의 흐름과 소설의 힘에 대한 깊이 있는 탐구를 담고 있습니다.
    저자 김선향은 20년간의 연구를 바탕으로 소설이 우리 사회와 개인의 삶에
    미치는 영향을 다양한 사례와 함께 설득력 있게 전달합니다.`,
    publisher_review: "책장을 덮어도 결코 잊을 수 없는 이야기...",
};

const BookInfoPage = () => {
    return (
        <div css={layoutStyles.BookInfoFrame}>
            <div css={layoutStyles.BookInfoDiv}>
                <div css={layoutStyles.BookInfoGroup}>
                    <div css={textStyles.BookInfoTextWrapper}>Book Information</div>
                </div>

                <div css={layoutStyles.BookInfoDiv2}>
                    <div css={layoutStyles.BookInfoView}>
                        <img css={layoutStyles.BookInfoImage} src={image5} alt={BD.title} />
                    </div>

                    <div css={layoutStyles.BookInfoDiv3}>
                        <div css={layoutStyles.BookInfoDiv4}>
                            <div css={textStyles.BookInfoTextWrapper2}>{BD.title}</div>
                            <div css={textStyles.BookInfoTextWrapper3}>{BD.author}</div>
                        </div>
                        <p css={textStyles.BookInfoP}>{BD.publisher} | {BD.published}</p>
                    </div>

                    <div css={layoutStyles.BookInfoGroupWrapper}>
                        <div css={layoutStyles.BookInfoChatRoomJoinWrapper}>
                            <div css={layoutStyles.BookInfoChatRoomJoin}>
                                <div css={layoutStyles.BookInfoDiv5}>
                                    <div css={layoutStyles.BookInfoDiv6}>
                                        <div css={textStyles.BookInfoTextWrapper4}>{BD.title} 채팅방 참여하기</div>
                                        <div css={textStyles.BookInfoTextWrapper5}>
                                            여러 사람들과 {BD.title}에 대해 이야기 해봅시다.
                                        </div>
                                    </div>
                                    <div css={layoutStyles.BookInfoDiv7}>
                                        <div css={layoutStyles.BookInfoDiv8}>
                                            <div css={textStyles.BookInfoTextWrapper6}>토론방 규칙</div>
                                            <div css={textStyles.BookInfoTextWrapper7}>
                                                지나친 욕설 / 내상언급 / 소통의 여지가 없는 일방적이고 무의미한 글<br />
                                                도배 / 지나친 친목 / 분란조성 / 수위오버 / 단속 / 카더라 / 타인 신상 언급 등등
                                            </div>
                                        </div>
                                        <div css={layoutStyles.BookInfoDivWrapper}>
                                            <Button text={"채팅방 참여하기"} type={"bigChatRoomJoin"}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div css={layoutStyles.BookInfoDiv9}>
                <div css={layoutStyles.BookInfoDiv10}>
                    <div css={layoutStyles.BookInfoDiv11}>
                        <div css={textStyles.BookInfoTextWrapper9}>책 소개</div>
                        <div css={textStyles.BookInfoTextWrapper10}>투표</div>
                        <div css={textStyles.BookInfoTextWrapper11}>출판사 서평</div>
                    </div>
                    <img css={layoutStyles.BookInfoLine} src={Line} alt="구분선" />
                </div>

                <div css={layoutStyles.BookInfoDescriptionWrapper}>
                    <div css={layoutStyles.BookInfoDescription}>
                        <div css={textStyles.BookInfoTextWrapper12}>책 소개</div>
                        <img css={layoutStyles.BookInfoLine} src={Line} alt="구분선" />
                        <div css={layoutStyles.BookInfoDescriptionText}>
                            <div css={textStyles.BookInfoTextWrapper13_15}>
                               {BD.book_description}
                            </div>
                        </div>
                    </div>
                </div>

                <div css={layoutStyles.BookInfoDiv8}>
                    <div css={layoutStyles.BookInfoDiv12}>
                        <div css={layoutStyles.BookInfoDiv13}>
                            <div css={textStyles.BookInfoTextWrapper16}>출판사 서평</div>
                            <img css={layoutStyles.BookInfoLine} src={Line} alt="구분선" />
                        </div>
                        <div css={textStyles.BookInfoTextWrapper17}>
                            {/* 출판사 서평 텍스트 (긴 본문) 생략 가능 */}
                            {BD.publisher_review}
                        </div>
                    </div>
                </div>

                <div css={layoutStyles.BookInfoView2}>
                    <div css={layoutStyles.BookInfoDiv14}>
                        <div css={textStyles.BookInfoTextWrapper12}>투표</div>
                        <img css={layoutStyles.BookInfoLine} src={Line} alt="구분선" />
                    </div>

                    <div css={layoutStyles.BookInfoDiv15}>
                        <div css={layoutStyles.BookInfoElement}>
                            <div css={layoutStyles.BookInfoDiv16}>
                                <div css={layoutStyles.BookInfoDiv17}>
                                    <div css={textStyles.BookInfoTextWrapper18}>
                                        소설은 현대 사회에서 어떤 역할을 하는가
                                    </div>
                                    <Bar />
                                </div>
                                <div css={layoutStyles.BookInfoDiv18}>
                                    <div css={layoutStyles.BookInfoOverlapGroupWrapper}>
                                        <div css={layoutStyles.BookInfoOverlapGroup}>
                                            <Button text={"찬성"} type={"voteOption"}/>
                                        </div>
                                    </div>
                                    <div css={layoutStyles.BookInfoOverlapGroupWrapper}>
                                        <div css={layoutStyles.BookInfoOverlapGroup}>
                                            <Button text={"반대"} type={"voteOption"}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookInfoPage;