import { SOCKET_URL } from "./settings";

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
    const path = `${SOCKET_URL}/ws/chat/${chatUrl}/`;
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
    if (command === "messages") {
      this.callbacks[command](parsedData.messages);
    }
    if (command === "new_message") {
      this.callbacks[command](parsedData.message);
    }
    if (command === "more_messages") {
      this.callbacks[command](parsedData.messages);
    }
  }

  fetchMessages(username, chatId, messageIndex) {
      this.sendMessage({
        command: "fetch_messages",
        username,
        chatId,
        messageIndex
      });
  }

  fetchMoreMessages(username, chatId, messageIndex) {
      this.sendMessage({
        command: "fetch_more_messages",
        username,
        chatId,
        messageIndex
      });
  }

  newChatMessage(message) {
    this.sendMessage({
      command: "new_message",
      from: message.from,
      message: message.content,
      chatId: message.chatId
    });
  }

  addCallbacks(messagesCallback, newMessageCallback,moreMessagesCallback) {
    this.callbacks["messages"] = messagesCallback;
    this.callbacks["new_message"] = newMessageCallback;
    this.callbacks["more_messages"] = moreMessagesCallback;
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