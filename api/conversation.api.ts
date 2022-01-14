import { IConversation } from "../types";
import apiServerClient from "./api-server-client";

const getConversationByUser = (userId: string, next: string) => apiServerClient.get<{ conversations: IConversation[]; next: string }>(`/users/${userId}/conversations?next=${next}`);
const create = (userId: string, receiverId: string) => apiServerClient.post(`/users/${userId}/conversations`, { receiverId });
const seeConversation = (conversationId: string, memberId: string) => apiServerClient.post(`/conversations/${conversationId}/seenBy/${memberId}`);
const getUnseenConversationsCount = (userId: string) => apiServerClient.get<number>(`/users/${userId}/conversations/unseen-count`);
const destroy = (conversationId: string, memberId: string) => apiServerClient.delete(`/conversations/${conversationId}/memberId/${memberId}`);

const conversationAPI = { getConversationByUser, create, seeConversation, getUnseenConversationsCount, destroy };
export default conversationAPI;
