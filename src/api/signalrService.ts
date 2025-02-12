import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";




/**
 * Устанавливает соединение с SignalR.
 * @param userId ID текущего пользователя.
 */
const murl = process.env.NEXT_PUBLIC_MAIN_API;
export const connectToChatHub = async (userId: string) => {
    console.log('hey its ur userid', userId);
    
    var connection = new HubConnectionBuilder()
        .withUrl(`${murl}/chat?userId=${userId}`)
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();
    connection.start()
        .then(() => console.log("SignalR connected successfully"))
        .catch(err => console.error("SignalR connection error:", err));

    return connection;
};


export const takeChatHistory = async (userId: string, friendId: string, conn: HubConnection) => {
    console.log(conn);
    if (!conn || conn.state !== "Connected") {
        console.error("Ошибка при попытке установить соединение");
        throw new Error("Ошибка при попытке установить соединение.");
    }

    try {
        console.log(`Запрос истории чата для ${userId} с ${friendId}`);
        const history = await conn.invoke("GetChat", friendId);
        console.log("История сообщений:", history);
        return history;
    } catch (error) {
        console.error("Ошибка получения истории чата:", error);
        return [];
    }
};
