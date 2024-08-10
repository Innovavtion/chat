import { Socket, io } from "socket.io-client";

export type IUser = {
  userId: string;
};

export type IMessage = {
  id: string;
  userId: string;
  chatId: string;
  text: string;
};

export type CreateMessageDto = {
  chatId: string;
  userId: string;
  text: string;
};

export type TypingChatUser = {
  chatId: string;
  userId: string;
  isTyping: boolean;
};

export type ServerToClientEvents = {
  "create-message": (data: IMessage) => void;
  "typing-chat": (data: TypingChatUser) => void;
};

export type ClientToServerEvents = {
  "create-message": (data: CreateMessageDto) => void;
  "join-chat": (chatId: string) => void;
  "leave-chat": (chatId: string) => void;
  "typing-chat": (data: TypingChatUser) => void;
};

class SocketChat {
  private readonly socket: Socket<ServerToClientEvents, ClientToServerEvents> =
    io("http://localhost:5000", { autoConnect: false });

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  joinChat(chatId: string) {
    this.socket.emit("join-chat", chatId);
  }

  leaveChat(chatId: string) {
    this.socket.removeListener("create-message");
    this.socket.removeListener("typing-chat");
    this.socket.emit("leave-chat", chatId);
  }

  createMessage(data: CreateMessageDto) {
    this.socket.emit("create-message", data);
  }

  createTypingMessage(data: TypingChatUser) {
    this.socket.emit("typing-chat", data);
  }

  subscribeCreateMessage(data: ServerToClientEvents["create-message"]) {
    this.socket.on("create-message", data);
  }

  subscribeTypingMessage(data: ServerToClientEvents["typing-chat"]) {
    this.socket.on("typing-chat", data);
  }
}

export const SocketService = new SocketChat();
