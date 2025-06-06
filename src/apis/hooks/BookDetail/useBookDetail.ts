// src/apis/hooks/BookDetail/useBookDetail.ts
import { useState, useEffect } from "react";

// BookData 타입 정의 (useBooks에서 동일한 타입 사용)
export interface BookData {
  bookId: number;
  bookRank: number;
  bookImageUrl: string;
  bookTitle: string;
  bookAuthor: string;
  bookDescription: string;
  publisherName: string;
  publishDate: string;
  publisherReview: string;
}

interface BookDetailApiResponse {
  code: number;
  message: string;
  data: BookData;
}

export const useBookDetail = (bookId: string | null | undefined) => {
  const [bookDetail, setBookDetail] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookDetail = async () => {
    if (!bookId) {
      setError("책 ID가 필요합니다.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const baseUrl = import.meta.env.VITE_BASE_URL;
      const authToken = localStorage.getItem("accessToken"); // ✅ 변경됨

      const response = await fetch(
        `${baseUrl}api/v1/book/get-book?bookId=${bookId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BookDetailApiResponse = await response.json();

      if (data.code === 0) {
        setBookDetail(data.data);
      } else {
        throw new Error(data.message || "책 정보를 가져올 수 없습니다.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
      console.error("책 상세 정보를 가져오는데 실패했습니다:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchBookDetail();
    } else {
      setLoading(false);
      setError("책 ID가 제공되지 않았습니다.");
    }
  }, [bookId]);

  return {
    bookDetail,
    loading,
    error,
    refetch: fetchBookDetail,
  };
};
