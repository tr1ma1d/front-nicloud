import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";


let connection: HubConnection | null = null;

/**
 * Устанавливает соединение с SignalR.
 * @param userId ID текущего пользователя.
 */
export const connectToChatHub = async (userId: string) => {
    console.log('hey');
    if (connection) {
        console.log("Connection already established");
        return connection;
    }

    connection = new HubConnectionBuilder()
        .withUrl(`https://localhost:44336/chat?userId=${userId}`)
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()// Используйте свой URL хаба
        .build();
    connection.start()
        .then(() => console.log("SignalR connected successfully"));
   
     
    console.log("SignalR connection established");
    if (!connection) {
        throw new Error("Соединение не установлено.");
    }
    else {
        console.log("CONNECT METHOD");
        console.log("---------------------------------");
        console.log(connection)
    }



    return connection;
};


export const takeChatHistory = async (userId: string, friendId: string) => {
    connectToChatHub(userId);
    console.log("----------------------------------------------------------------")
    console.log("OPEN CHAT HISTORY");
    console.log(connection);
    if (!connection || connection.state !== "Connected") {
        console.error("Ошибка при попытке установить соединение");
        throw new Error("Ошибка при попытке установить соединение.");
    }

    try {
        console.log(`Запрос истории чата для ${userId} с ${friendId}`);
        const history = await connection.invoke("GetChat", friendId);
        console.log("История сообщений:", history);
        return history;
    } catch (error) {
        console.error("Ошибка получения истории чата:", error);
        return [];
    }
};
