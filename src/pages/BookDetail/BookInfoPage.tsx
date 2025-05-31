import Button from "../../components/Button/Button.tsx";
import BookPageVoteCard from "@components/BookPageVoteCard/BookPageVoteCard.tsx";
import * as styles from "./BookInfoPage.style.ts";
import * as textStyles from "./BookInfoPageText.style.ts";
import { line } from "@assets/index.ts";
import image5 from "../../assets/img/image 5.png";

// 책 데이터
const bookData = {
  image: image5,
  title: "소년이 온다",
  author: "한강",
  publisher: "창비",
  published: "2014년 5월 19일",
  book_description: `이 책은 현대 문학의 흐름과 소설의 힘에 대한 깊이 있는 탐구를 담고 있습니다.
    저자 김선향은 20년간의 연구를 바탕으로 소설이 우리 사회와 개인의 삶에
    미치는 영향을 다양한 사례와 함께 설득력 있게 전달합니다.`,
  publisher_review:
    "책장을 덮어도 결코 잊을 수 없는 이야기끝나지 않는 오월, 피지 못한 아이들의 영혼을 위한 간절한 노래『소년이 온다』는 1980년 5월 18일부터 열흘간 있었던 광주민주화운동 당시의 상황과 그 이후 남겨진 사람들의 이야기를 철저한 고증과 취재를 바탕으로 한강 특유의 정교하고도 밀도 있는 문장으로 그려낸다." 
};

// 책 커버 컴포넌트
const BookCover = () => (
  <div css={styles.bookCover}>
    <img css={styles.bookImage} src={bookData.image} alt={bookData.title} />
  </div>
);

// 책 정보 헤더 컴포넌트
const BookHeader = () => (
  <div css={styles.bookHeader}>
    <h1 css={textStyles.bookTitle}>{bookData.title}</h1>
    <h2 css={textStyles.bookAuthor}>{bookData.author}</h2>
    <p css={textStyles.bookPublisher}>
      {bookData.publisher} | {bookData.published}
    </p>
  </div>
);

// 채팅방 참여 섹션 컴포넌트
const ChatRoomSection = () => (
  <section css={styles.chatRoomSection}>
    <div css={styles.chatRoomInfo}>
      <h3 css={textStyles.chatRoomTitle}>{bookData.title} 채팅방 참여하기</h3>
      <p css={textStyles.chatRoomDesc}>
        여러 사람들과 {bookData.title}에 대해 이야기 해봅시다.
      </p>
    </div>
    
    <div css={styles.chatRoomRules}>
      <h4 css={textStyles.rulesTitle}>토론방 규칙</h4>
      <p css={textStyles.rulesDesc}>
        지나친 욕설 / 내상언급 / 소통의 여지가 없는 일방적이고 무의미한 글<br />
        도배 / 지나친 친목 / 분란조성 / 수위오버 / 단속 / 카더라 / 타인 신상 언급 등등
      </p>
      <Button text={"채팅방 참여하기"} type={"bigChatRoomJoin"} />
      
    </div>
  </section>
);

// 탭 네비게이션 컴포넌트
const TabNavigation = () => (
  <nav css={styles.tabNavigation}>
    <ul css={styles.tabList}>
      <li css={textStyles.activeTab}>책 소개</li>
      <li css={textStyles.inactiveTab}>투표</li>
      <li css={textStyles.inactiveTab}>출판사 서평</li>
    </ul>
    <img css={styles.dividerLine} src={line} alt="구분선" />
  </nav>
);

// 책 소개 섹션 컴포넌트
const BookDescription = () => (
  <section css={styles.contentSection}>
    <h3 css={textStyles.sectionTitle}>책 소개</h3>
    <img css={styles.dividerLine} src={line} alt="구분선" />
    <p css={textStyles.descriptionText}>{bookData.book_description}</p>
  </section>
);

// 출판사 서평 섹션 컴포넌트
const PublisherReview = () => (
  <section css={styles.contentSection}>
    <h3 css={textStyles.sectionTitle}>출판사 서평</h3>
    <img css={styles.dividerLine} src={line} alt="구분선" />
    <p css={textStyles.reviewText}>{bookData.publisher_review}</p>
  </section>
);

// 투표 섹션 컴포넌트
const VoteSection = () => (
  <section css={styles.contentSection}>
    <h3 css={textStyles.sectionTitle}>투표</h3>
    <img css={styles.dividerLine} src={line} alt="구분선" />
    <div css={styles.voteContainer}>
      <BookPageVoteCard />
    </div>
  </section>
);

// 메인 컴포넌트
const BookInfoPage = () => {
  return (
    <main css={styles.container}>
      <header css={styles.pageHeader}>
        <h2 css={textStyles.pageTitle}>Book Information</h2>
      </header>

      <section css={styles.bookInfoSection}>
        <BookCover />
        <div css={styles.bookDetails}>
          <BookHeader />
        </div>
      </section>
      <ChatRoomSection />

      <section css={styles.contentContainer}>
        <TabNavigation />
        <BookDescription />
        <PublisherReview />
        <VoteSection />
      </section>
    </main>
  );
};

export default BookInfoPage;