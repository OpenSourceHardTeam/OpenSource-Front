import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as styles from "./BookInfoPage.style.ts";
import * as textStyles from "./BookInfoPageText.style.ts";
import { line } from "@assets/index.ts";
import { useBookDetail } from "../../apis/hooks/BookDetail/useBookDetail.ts";
import { BookData } from "../../apis/hooks/Books/useBooks"; // BookData 타입 import
import ErrorState from "@components/ErrorState/ErrorState.tsx";
import PublisherReview from "./component/PublisherReview.tsx";
import BookCover from "./component/BookCoverProps.tsx";
import BookHeader from "./component/BookHeader.tsx";
import ChatRoomSection from "./component/ChatRoomSectionProps.tsx";
import BookDescription from "./component/BookDescription.tsx";
import VoteSection from "./component/VoteSection.tsx";

interface TabNavigatioinProps {
  activeTab: string;
  onTabClick: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigatioinProps> = ({
  activeTab,
  onTabClick,
}) => {
  const tabs = [
    { id: "bookdes", label: "책 소개" },
    { id: "review", label: "출판사 서평" },
    { id: "vote", label: "투표" },
  ];
  return (
    <nav css={styles.tabNavigation}>
      <ul css={styles.tabList}>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            css={
              activeTab === tab.id
                ? textStyles.activeTab
                : textStyles.inactiveTab
            }
            onClick={() => onTabClick(tab.id)}
            style={{ cursor: "pointer" }}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <img css={styles.dividerLine} src={line} alt="구분선" />
    </nav>
  );
};

const LoadingState = () => (
  <div css={styles.container}>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
        fontSize: "18px",
        color: "#666",
      }}
    >
      책 정보를 불러오는 중...
    </div>
  </div>
);

// 메인 컴포넌트
const BookInfoPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [activeTab, setActiveTab] = useState<string>("bookdes");

  const { bookDetail, loading, error, refetch } = useBookDetail(bookId || null);

  const location = useLocation();

  // 🔥 bookDetail을 BookData 형식으로 변환하는 함수
  const convertToBookData = (detail: any): BookData | null => {
    if (!detail) return null;

    return {
      bookId: detail.bookId || parseInt(bookId || "0"),
      bookTitle: detail.bookTitle || "",
      bookAuthor: detail.bookAuthor || "",
      bookImageUrl: detail.bookImageUrl || "",
      bookRank: detail.bookRank || 0,
      publisherName: detail.publisherName || "",
      publishDate: detail.publishDate || "",
      publisherReview: detail.publisherReview || "",
      bookDescription: detail.bookDescription || "",
    };
  };

  useEffect(() => {
    if (bookDetail && location.hash) {
      const elementId = location.hash.replace("#", "");
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [bookDetail, location]);

  // 클릭 이벤트 핸들러
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);

    // 해당 섹션으로 이동
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (!bookDetail) {
    return (
      <div css={styles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
            fontSize: "18px",
            color: "#666",
          }}
        >
          책 정보를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  const bookData = convertToBookData(bookDetail);

  return (
    <div css={styles.MainContainer}>
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
        {bookData && (
          <ChatRoomSection
            bookTitle={bookDetail.bookTitle}
            bookData={bookData}
          />
        )}

        <section css={styles.contentContainer}>
          <TabNavigation activeTab={activeTab} onTabClick={handleTabClick} />
          <BookDescription description={bookDetail.bookDescription} />
          <PublisherReview review={bookDetail.publisherReview} />
          <VoteSection />
        </section>
      </main>
    </div>
  );
};

export default BookInfoPage;
