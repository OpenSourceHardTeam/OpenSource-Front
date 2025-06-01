import { useState, useEffect } from "react";

// API 응답 타입 정의
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

interface ApiResponse {
  code: number;
  message: string;
  data: BookData[];
}

export const useBooks = () => {
  const [bookList, setBookList] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API 호출 함수
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 환경변수에서 BASE_URL과 토큰 가져오기
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const authToken = import.meta.env.VITE_AUTH_TOKEN;
      
      console.log('API 요청 URL:', `${baseUrl}api/v1/book/get-all-book`);
      
      const response = await fetch(`${baseUrl}api/v1/book/get-all-book`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization 헤더 추가 (필요한 경우)
          ...(authToken && { 'Authorization': `Bearer ${authToken}` })
        }
      });
      
      console.log('응답 상태:', response.status);
      console.log('응답 헤더:', response.headers.get('content-type'));
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      console.log('API 응답 데이터:', data);
      
      if (data.code === 0) {
        setBookList(data.data);
      } else {
        throw new Error(data.message || 'API 응답 오류');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      console.error('책 목록을 가져오는데 실패했습니다:', err);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    bookList,
    loading,
    error,
    refetch: fetchBooks
  };
};