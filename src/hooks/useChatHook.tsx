import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { HubConnection } from "@microsoft/signalr";
import { connectToChatHub, takeChatGroupHistory, takeChatHistory } from "@/api/signalrService";
import { useSelector } from "react-redux";
import { RootState } from '@/store/store';

interface UserState {
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
interface Chat {
  chatId: string;
  name: string;
}
interface UseChatHook {
  chatHistory: ChatMessage[];
  headerName: string;
  handleSendMessage: (message: string) => Promise<void>;
  handleFriendSelection: (friend: Friend) => Promise<void>;
  handleGroupSelection: (chat: Chat) => Promise<void>;
  handleSendGroup: (message: string) => Promise<void>;
  msgContainer: React.RefObject<HTMLDivElement>;
  currentChatType: string;
}

export const useChat = (
  user: Pick<UserState, 'id' | 'username'>
): UseChatHook => {

  const [selectedFriend, setSelectedFriend] = useState<Friend | undefined>(undefined);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Chat | undefined>();
  const [headerName, setHeaderName] = useState<string>("Default");
  const [currentChatType, setCurrentChatType] = useState<'direct' | 'group'>('direct');
  const router = useRouter();
  const msgContainer = useRef<HTMLDivElement | null>(null);

  const selectedFriendRef = useRef<Friend | undefined>();
  const selectedGroupRef = useRef<Chat | undefined>();
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

          conn.on("ReceiveMessage", (senderId, username, content, receiverId) => {
            console.log("Sending to:", selectedFriendRef.current?.id,
              "Message:", content,
              "ReceiverFront", selectedFriendRef.current?.id,
              "ReceiverBack", receiverId);

            const isDirect =
              selectedFriendRef.current &&
              ((selectedFriendRef.current.id === senderId && user.id === receiverId) ||
                (selectedFriendRef.current.id === receiverId && user.id === senderId));

            const isGroup =
              selectedGroupRef.current &&
              selectedGroupRef.current.chatId === receiverId;

            if (isDirect || isGroup) {
              const newMessage: ChatMessage = {
                id: crypto.randomUUID(),
                senderId,
                username,
                content,
              };
              setChatHistory((prevMessages) => [...prevMessages, newMessage]);
              console.log(chatHistory);
            }
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
  const handleSendGroup = async (message: string) => {
    if (connection && selectedGroup) {
      try {
        await connection.invoke("SendChatMessage", selectedGroup.chatId, message);
      } catch (err) {
        console.error("Error sending message:", err);
      }
    }
  };

  const handleFriendSelection = async (friend: Friend) => {
    setCurrentChatType('direct');
    setSelectedFriend(friend);
    selectedFriendRef.current = friend;
    setHeaderName(friend.username);
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

  const handleGroupSelection = async (chat: Chat) => {
    setCurrentChatType('group');
    setSelectedGroup(chat);
    setHeaderName(chat.name);
  
    selectedGroupRef.current = chat;
    console.log("Chat object:", chat, "ID");
    console.log(chat.chatId);
    try {
      const history = await takeChatGroupHistory(chat.chatId, connection!);
      const updatedHistory = history.map((msg: any) => ({
        ...msg,
        username: msg.username,
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
    headerName,
    handleSendMessage,
    handleFriendSelection,
    handleGroupSelection,
    handleSendGroup,
    msgContainer,
    currentChatType
  };
};
