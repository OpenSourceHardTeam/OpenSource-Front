import React from "react"
import "./Footer.css"

const Footer: React.FC = () => {
    return <div className="footer">
        <div className="footer-frame">
            <div className="footertext-wrapper">BOOKING</div>
            <div className="footer-frame2">
                <div className="footertext-wrapper2">TEAM BOOKING</div>
                <div className="footer-frame3">
                    <div className="footertext-wrapper2">메일</div>
                    <div className="footertext-wrapper2">|</div>
                    <div className="footertext-wrapper2">ehdwo1227@naver.com</div>
                </div>
            </div>
            <div className="footer-frame4">
                <div className="text-wrapper2">이용약관</div>
                <div className="text-wrapper2">개인정보처리방침</div>
                <div className="text-wrapper2">문의하기</div>
            </div>
        </div>
        <p className="footer-p">© 2025 booking. All rights reserved. </p>
    </div>
}

export default Footer;