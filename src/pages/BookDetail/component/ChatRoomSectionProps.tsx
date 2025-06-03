import { Button } from "@components/index";
import * as styles from "../BookInfoPage.style";
import * as textStyles from "../BookInfoPageText.style";

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
      <h4 css={textStyles.rulesTitle}>[자동 필터링 안내]</h4>
      <p css={textStyles.rulesDesc}>
        본 토론방은 욕설·비방·유해 표현을 실시간으로 감지 및 차단하는 AI <br />
        챗봇 필터링 시스템을 운영하고 있습니다. 부적절한 표현이 감지되면
        <br />
        자동으로 수정됩니다.
      </p>
      <Button
        text={"채팅방 참여하기"}
        type={"bigChatRoomJoin"}
        css={styles.buttonStyle}
      />
    </div>
  </section>
);

export default ChatRoomSection;
