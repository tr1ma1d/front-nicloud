import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { HubConnection } from "@microsoft/signalr";
import { connectToChatHub, takeChatGroupHistory, takeChatHistory } from "@/api/signalrService";

interface UserState{
    id: string;
    username: string;
    email: string;
    password: string
    phone: string;
}
interface ChatMessage {
  id: string;
  senderId: string;
  username: string;
  content: string;
}
  
interface Friend {
  id: string;
  username: string;
}
interface Chat{
  chatId: string;
  name: string;
}
interface UseChatHook {
  chatHistory: ChatMessage[];
  selectedFriend: Friend | null;
  selectedGroup: Chat | undefined;
  handleSendMessage: (message: string) => Promise<void>;
  handleFriendSelection: (friend: Friend) => Promise<void>;
  handleGroupSelection: (chat: Chat) => Promise<void>;
  msgContainer: React.RefObject<HTMLDivElement>;
}

export const useChat = (
  user: Pick<UserState, 'id' | 'username'>
): UseChatHook => {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Chat | undefined>();
  const router = useRouter();
  const msgContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (user == null) {
      router.replace("/auth");
      return;
    }

    if (!connection) {
      const initConnection = async () => {
        try {
          const conn = await connectToChatHub(user.id);
          setConnection(conn);

          conn.on("ReceiveMessage", (senderId, username, content) => {
            const newMessage: ChatMessage = {
              id: crypto.randomUUID(),
              senderId,
              username,
              content,
            };
            setChatHistory((prevMessages) => [...prevMessages, newMessage]);
          });
        } catch (err) {
          console.error("Error initializing SignalR connection:", err);
        }
      };

      initConnection();
    }

    return () => {
      if (connection) {
        connection.off("ReceiveMessage");
      }
    };
  }, [user, connection]);

  useEffect(() => {
    if (msgContainer.current) {
      msgContainer.current.scrollTop = msgContainer.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async (message: string) => {
    if (connection && selectedFriend) {
      try {
        await connection.invoke("SendMessage", selectedFriend.id, message);
      } catch (err) {
        console.error("Error sending message:", err);
      }
    }
  };

  const handleFriendSelection = async (friend: Friend) => {
    setSelectedFriend(friend);
    try {
      const history = await takeChatHistory(user!.id, friend.id, connection!);
      const updatedHistory = history.map((msg: any) => ({
        ...msg,
        username: msg.senderId === friend.id ? friend.username : user!.username,
      }));
      setChatHistory(updatedHistory);

      setTimeout(() => {
        if (msgContainer.current) {
          msgContainer.current.scrollTop = msgContainer.current.scrollHeight;
        }
      }, 0);
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  };

  const handleGroupSelection = async (chat: Chat) =>{
    setSelectedGroup(chat);
    console.log("Chat object:", chat, "ID");
    console.log(chat.chatId);
    try{
      const history = await takeChatGroupHistory(chat.chatId, connection!);
      const updatedHistory = history.map((msg:any) => ({
        ...msg,
        username: msg.senderId,
      }));
      setChatHistory(updatedHistory);

      setTimeout(() => {
        if (msgContainer.current) {
          msgContainer.current.scrollTop = msgContainer.current.scrollHeight;
        }
      }, 0);
    }
    catch (error) {
      console.error("Error loading group history:", error);
    }
  }

  return {
    chatHistory,
    selectedFriend,
    selectedGroup,
    handleSendMessage,
    handleFriendSelection,
    handleGroupSelection,
    msgContainer,
  };
};
