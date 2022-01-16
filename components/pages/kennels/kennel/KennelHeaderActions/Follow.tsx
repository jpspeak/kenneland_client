import { Button } from "@chakra-ui/button";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useToast } from "@chakra-ui/toast";
import { Tooltip } from "@chakra-ui/tooltip";
import { useSetRecoilState } from "recoil";
import useSWR from "swr";
import kennelAPI from "../../../../../api-routes/kennel.api";
import useUser from "../../../../../hooks/swr/use-user";
import authModalAtom from "../../../../../state/atoms/auth-modal.atom";

const Follow = ({ kennelId }: { kennelId: string }) => {
  const { user } = useUser();

  const { data: isFollowed, mutate: mutateIsFollowed } = useSWR(user ? `users/${user._id}/kennels/${kennelId}/is-followed` : null, () =>
    kennelAPI.isFollowed(kennelId, user?._id!).then(res => res.data)
  );
  const setAuthModal = useSetRecoilState(authModalAtom);
  const toast = useToast();

  const buttonSize = useBreakpointValue({ base: "xs", md: "sm" });

  const follow = async () => {
    if (user) {
      try {
        mutateIsFollowed(true, false);
        await kennelAPI.follow(kennelId, user._id);
        mutateIsFollowed();
      } catch (error) {}
    } else {
      toast({
        title: "Please log in first",
        duration: 3000,
        status: "error",
        position: "top",
        variant: "subtle",
        isClosable: true
      });
      setAuthModal({ isOpen: true });
    }
  };
  const unfollow = async () => {
    if (user) {
      try {
        mutateIsFollowed(false, false);
        await kennelAPI.unfollow(kennelId, user._id);
        mutateIsFollowed();
      } catch (error) {}
    }
  };
  return (
    <>
      <Tooltip label={isFollowed ? "Unfollow" : "Follow"} hasArrow>
        {isFollowed ? (
          <Button variant='outline' rounded='full' p='4' size={buttonSize} onClick={unfollow}>
            Unfollow
          </Button>
        ) : (
          <Button variant='outline' rounded='full' p='4' size={buttonSize} onClick={follow}>
            Follow
          </Button>
        )}
      </Tooltip>
    </>
  );
};

export default Follow;
