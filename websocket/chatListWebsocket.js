import { SOCKET_URL } from "../settings";


class WebSocketService {
    static instance = null;
    callbacks = {};

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    constructor() {
        this.socketRef = null;
    }

    connect(chatUrl) {
        const path = `${SOCKET_URL}/ws/chatList/${chatUrl}/`;
        this.socketRef = new WebSocket(path);
        this.socketRef.onopen = () => {
            console.log("WebSocket open");
        };
        this.socketRef.onmessage = e => {
            this.socketNewMessage(e.data);
        };
        this.socketRef.onerror = e => {
            console.log(e.message);
        };
        this.socketRef.onclose = () => {
            console.log("WebSocket closed");
        };
    }

    disconnect() {
        if (this.socketRef){
            this.socketRef.close();
        }
    }

    socketNewMessage(data) {
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if (Object.keys(this.callbacks).length === 0) {
            return;
        }
        if (command === "chats") {
            this.callbacks[command](parsedData.chats);
        }
        if (command === "new_chat") {
            this.callbacks[command](parsedData.chat);
        }
        if (command === "more_chats") {
            this.callbacks[command](parsedData.chats);
        }
    }

    fetchChats(username, chatIndex) {
        this.sendMessage({
            command: "fetch_chats",
            username,
            chatIndex,
        });
    }

    fetchMoreChats(username, chatIndex) {
        this.sendMessage({
            command: "fetch_more_chats",
            username,
            chatIndex,
        });
    }

    newChat(message) {
        this.sendMessage({
            command: "new_chat",
            from: message.from,
            message: message.content,
            chatId: message.chatId,
        });
    }

    addCallbacks(
        chatsCallback, 
        newChatCallback,
        moreChatsCallback
    ){
        this.callbacks["chats"] = chatsCallback;
        this.callbacks["new_chat"] = newChatCallback;
        this.callbacks["more_chat"] = moreChatsCallback;
    }

    sendMessage(data) {
        try {
            this.socketRef.send(JSON.stringify({ ...data }));
        } catch (err) {
            console.log(err.message);
        }
    }

    state() {
        return this.socketRef.readyState;
    }
}


const WebSocketInstance = WebSocketService.getInstance();


export default WebSocketInstance;