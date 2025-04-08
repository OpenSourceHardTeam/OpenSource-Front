/** @jsxImportSource @emotion/react */
import React from "react";
import * as styles from "./Footer.style";

const Footer: React.FC = () => {
  return (
    <div css={styles.footer}>
      <div css={styles.footerGroup}>
        <div css={styles.footerFrame}>
          <div css={styles.footerTextWrapper}>BOOKING</div>
          <div css={styles.footerFrame2}>
            <div css={styles.footerTextWrapper2}>TEAM BOOKING</div>
            <div css={styles.footerFrame3}>
              <div css={styles.footerTextWrapper2}>메일</div>
              <div css={styles.footerTextWrapper2}>|</div>
              <div css={styles.footerTextWrapper2}>ehdwo1227@naver.com</div>
            </div>
          </div>
          <div css={styles.footerFrame4}>
            <div css={styles.footerTextWrapper2}>이용약관</div>
            <div css={styles.footerTextWrapper2}>개인정보처리방침</div>
            <div css={styles.footerTextWrapper2}>문의하기</div>
          </div>
        </div>
        <p css={styles.footerP}>© 2025 booking. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
