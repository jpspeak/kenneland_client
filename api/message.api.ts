import { AxiosResponse } from "axios";
import { IMessage, IPaginatedCursor } from "../types";
import apiServerClient from "./api-server-client";

const getMessagesByConversation = (conversationId: string, next: string) => apiServerClient.get<{ messages: IMessage[]; next: string }>(`/conversations/${conversationId}/messages?next=${next}`);

const getMessagesByMembers = (memberSelfId: string, memberId: string, next: string) =>
  apiServerClient.get<{ messages: IMessage[]; next: string }>(`/messages/memberSelfId/${memberSelfId}/memberId/${memberId}?next=${next}`);

const create = (senderId: string, receiverId: string, messageBody: string) =>
  apiServerClient.post<{ senderId: string; receiverId: string; messageBody: string }, AxiosResponse<IMessage>>(`/messages`, { senderId, receiverId, messageBody });

const createByConversationId = (conversationId: string, senderId: string, senderType: string, messageBody: string) =>
  apiServerClient.post<{ senderId: string; senderType: string; messageBody: string }, AxiosResponse<IMessage>>(`/conversations/${conversationId}/messages`, {
    senderId,
    senderType,
    messageBody
  });

const messageAPI = { getMessagesByConversation, create, createByConversationId, getMessagesByMembers };
export default messageAPI;
