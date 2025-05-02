declare module '@chatscope/chat-ui-kit-react' {
    import { FC, ReactNode } from 'react';
    
    interface MessageModel {
      message: string;
      direction: 'incoming' | 'outgoing';
      position: 'first' | 'normal' | 'last' | 'single';
      sender?: string;
      sentTime?: string;
    }
    
    interface MainContainerProps {
      children?: ReactNode;
      style?: React.CSSProperties;
      className?: string;
    }
    
    interface ChatContainerProps {
      children?: ReactNode;
      style?: React.CSSProperties;
      className?: string;
    }
    
    interface MessageListProps {
      children?: ReactNode;
      style?: React.CSSProperties;
      className?: string;
    }
    
    interface MessageProps {
      model: MessageModel;
      style?: React.CSSProperties;
      className?: string;
    }
    
    interface MessageInputProps {
      placeholder?: string;
      onChange?: (innerHtml: string, textContent: string, innerText: string, nodes: NodeList) => void;
      onSend?: (innerHtml: string, textContent: string, innerText: string, nodes: NodeList) => void;
      style?: React.CSSProperties;
      className?: string;
    }
    
    export const MainContainer: FC<MainContainerProps>;
    export const ChatContainer: FC<ChatContainerProps>;
    export const MessageList: FC<MessageListProps>;
    export const Message: FC<MessageProps>;
    export const MessageInput: FC<MessageInputProps>;
    // 필요한 다른 컴포넌트들은 계속 추가할 수 있습니다
  }