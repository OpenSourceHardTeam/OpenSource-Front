import * as styles from "./ErrorState.style";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => (
  <div css={styles.container}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
        gap: "16px",
      }}
    >
      <div style={{ fontSize: "18px", color: "#e74c3c" }}>오류: {error}</div>
      <button
        onClick={onRetry}
        style={{
          padding: "8px 16px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        다시 시도
      </button>
    </div>
  </div>
);

export default ErrorState;
