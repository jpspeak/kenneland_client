import useSWR from "swr";
import conversationAPI from "../../api/conversation.api";
import useUser from "./use-user";

const useUnseenConversationsCount = () => {
  const { user } = useUser();
  const { data, mutate } = useSWR(user ? `/users/${user._id}/conversations/unseen-count` : null, () => conversationAPI.getUnseenConversationsCount(user?._id!).then(res => res.data));
  return { unseenConversationsCount: data, mutateUnseenConversationsCount: mutate };
};

export default useUnseenConversationsCount;
