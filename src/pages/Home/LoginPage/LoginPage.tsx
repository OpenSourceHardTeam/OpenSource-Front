import * as styles from "./LoginPage.style"
import Line from "../../../assets/img/Line.png"
import Button from "../../../components/Button/Button"

const LoginPage = () => {
    return <div css = {styles.loginframe}>
        <div css = {styles.logintext}>로그인</div>
        <div css = {styles.logincheck}>
            <input css = {styles.loginid} placeholder="아이디"/>
            <Button text = {"중복확인"} type={"duplicate"}/>
        </div>
        <input css = {styles.loginpw} placeholder="비밀번호"/>
        <Button text={"로그인"} type={"login"}/>
        <div >
            <img  src={Line} />
            <div css = {styles.text}>또는</div>
            <img  src={Line} />
        </div>

        <Button text={"회원가입"} type={"signup"}/>
        
    </div>
}

export default LoginPage;