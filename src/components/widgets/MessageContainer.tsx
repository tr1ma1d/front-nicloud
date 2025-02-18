import { FC } from "react";
import Message from "../Message";

interface MessageContainerProps{
    msgContainer: React.RefObject<HTMLDivElement>;
    chatHistory: { id: string; username: string; content: string }[];
}
const MessageContainer:FC<MessageContainerProps> = ({msgContainer, chatHistory}) => {
    return (
        <div ref={msgContainer} className="container_message">
            <div className="msg-con" >
                {chatHistory.map((msg) => (
                    <Message key={msg.id} username={msg.username} content={msg.content} />
                ))}
            </div>
        </div>
    );

}
export default MessageContainer;