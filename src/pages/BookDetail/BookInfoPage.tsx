import { useParams } from "react-router-dom"; 
import { useState } from "react"
import Button from "../../components/Button/Button.tsx";
import BookPageVoteCard from "@components/BookPageVoteCard/BookPageVoteCard.tsx";
import * as styles from "./BookInfoPage.style.ts";
import * as textStyles from "./BookInfoPageText.style.ts";
import { line } from "@assets/index.ts";
import { useBookDetail } from "../../apis/hooks/BookDetail/useBookDetail.ts";

// 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};

// 로딩 컴포넌트
const LoadingState = () => (
  <div css={styles.container}>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
      fontSize: '18px',
      color: '#666'
    }}>
      책 정보를 불러오는 중...
    </div>
  </div>
);

// 에러 컴포넌트
interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => (
  <div css={styles.container}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
      gap: '16px'
    }}>
      <div style={{ fontSize: '18px', color: '#e74c3c' }}>
        오류: {error}
      </div>
      <button 
        onClick={onRetry}
        style={{
          padding: '8px 16px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        다시 시도
      </button>
    </div>
  </div>
);

// 책 커버 컴포넌트
interface BookCoverProps {
  imageUrl: string;
  title: string;
}

const BookCover: React.FC<BookCoverProps> = ({ imageUrl, title }) => (
  <div css={styles.bookCover}>
    <img 
      css={styles.bookImage} 
      src={imageUrl} 
      alt={title}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = '/default-book-image.png';
      }}
    />
  </div>
);

// 책 정보 헤더 컴포넌트
interface BookHeaderProps {
  title: string;
  author: string;
  publisher: string;
  publishDate: string;
}

const BookHeader: React.FC<BookHeaderProps> = ({ title, author, publisher, publishDate }) => (
  <div css={styles.bookHeader}>
    <h1 css={textStyles.bookTitle}>{title}</h1>
    <h2 css={textStyles.bookAuthor}>{author}</h2>
    <p css={textStyles.bookPublisher}>
      {publisher} | {formatDate(publishDate)}
    </p>
  </div>
);

// 채팅방 참여 섹션 컴포넌트
interface ChatRoomSectionProps {
  bookTitle: string;
}

const ChatRoomSection: React.FC<ChatRoomSectionProps> = ({ bookTitle }) => (
  <section css={styles.chatRoomSection}>
    <div css={styles.chatRoomInfo}>
      <h3 css={textStyles.chatRoomTitle}>{bookTitle} 채팅방 참여하기</h3>
      <p css={textStyles.chatRoomDesc}>
        여러 사람들과 {bookTitle}에 대해 이야기 해봅시다.
      </p>
    </div>
        
    <div css={styles.chatRoomRules}>
      <h4 css={textStyles.rulesTitle}>토론방 규칙</h4>
      <p css={textStyles.rulesDesc}>
         [자동 필터링 안내] <br /> 
          본 토론방은 욕설·비방·유해 표현을 실시간으로 감지 및 차단하는 AI <br />
          챗봇 필터링 시스템을 운영하고 있습니다. 부적절한 표현이 감지되면<br />
          자동으로 수정됩니다.
      </p>
      <Button text={"채팅방 참여하기"} type={"bigChatRoomJoin"} />           
    </div>
  </section>
);

interface TabNavigatioinProps {
  activeTab: string;
  onTabClick: (tabId: string) => void;
}

// 탭 네비게이션 컴포넌트
const TabNavigation: React.FC<TabNavigatioinProps> = ({ activeTab, onTabClick }) => {
  const tabs = [
    {id: 'bookdes', label: '책 소개'},
    {id: 'vote', label: '투표'},
    {id: 'review', label: '출판사 서평'}
  ];
  return(
     <nav css={styles.tabNavigation}>
    <ul css={styles.tabList}>
      {tabs.map((tab) => (
        <li
          key={tab.id} 
          css={activeTab === tab.id ? textStyles.activeTab : textStyles.inactiveTab}
          onClick={() => onTabClick(tab.id)}
          style={{ cursor: 'pointer'}}
          >
            {tab.label}
          </li>
      ))}
    </ul>
    <img css={styles.dividerLine} src={line} alt="구분선" />
  </nav>
  );
 
};



// 책 소개 섹션 컴포넌트
interface BookDescriptionProps {
  description: string;
}

const BookDescription: React.FC<BookDescriptionProps> = ({ description }) => (
  <section id="bookdes" css={styles.contentSection}>
    <h3 css={textStyles.sectionTitle}>책 소개</h3>
    <img css={styles.dividerLine} src={line} alt="구분선" />
    <p css={textStyles.descriptionText}>{description}</p>
  </section>
);

// 출판사 서평 섹션 컴포넌트
interface PublisherReviewProps {
  review: string;
}

const PublisherReview: React.FC<PublisherReviewProps> = ({ review }) => (
  <section id = "review" css={styles.contentSection}>
    <h3 css={textStyles.sectionTitle}>출판사 서평</h3>
    <img css={styles.dividerLine} src={line} alt="구분선" />
    <p css={textStyles.reviewText}>{review}</p>
  </section>
);

// 투표 섹션 컴포넌트
const VoteSection = () => (
  <section id = "vote" css={styles.contentSection}>
    <h3 css={textStyles.sectionTitle}>투표</h3>
    <img css={styles.dividerLine} src={line} alt="구분선" />
    <div css={styles.voteContainer}>
      <BookPageVoteCard />
    </div>
  </section>
);

// 메인 컴포넌트
const BookInfoPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [activeTab, setActiveTab] = useState<string>('bookdes');
  
  const { bookDetail, loading, error, refetch } = useBookDetail(bookId || null);

  // 클릭 이벤트 핸들러
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);

    // 해당 섹션으로 이동
    const element = document.getElementById(tabId);
    if(element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // 로딩 상태
  if (loading) {
    return <LoadingState />;
  }

  // 에러 상태
  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  // 책 데이터가 없는 경우
  if (!bookDetail) {
    return (
      <div css={styles.container}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
          fontSize: '18px',
          color: '#666'
        }}>
          책 정보를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <main css={styles.container}>
      <header css={styles.pageHeader}>
        <h2 css={textStyles.pageTitle}>Book Information</h2>
      </header>
     
      <section css={styles.bookInfoSection}>
        <BookCover 
          imageUrl={bookDetail.bookImageUrl} 
          title={bookDetail.bookTitle} 
        />
        <div css={styles.bookDetails}>
          <BookHeader 
            title={bookDetail.bookTitle}
            author={bookDetail.bookAuthor}
            publisher={bookDetail.publisherName}
            publishDate={bookDetail.publishDate}
          />
        </div>
      </section>
      
      <ChatRoomSection bookTitle={bookDetail.bookTitle} />
       
      <section css={styles.contentContainer}>
        <TabNavigation 
          activeTab = {activeTab}
          onTabClick = {handleTabClick}
        />
        <BookDescription description={bookDetail.bookDescription} />
        <VoteSection />
        <PublisherReview review={bookDetail.publisherReview} />
      </section>
    </main>
  );
};

export default BookInfoPage;