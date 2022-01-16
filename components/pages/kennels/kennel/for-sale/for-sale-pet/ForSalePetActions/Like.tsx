import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { useToast } from "@chakra-ui/toast";
import { Tooltip } from "@chakra-ui/tooltip";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useSetRecoilState } from "recoil";
import useSWR from "swr";
import forSalePetAPI from "../../../../../../../api-routes/for-sale-pet.api";
import useUser from "../../../../../../../hooks/swr/use-user";
import authModalAtom from "../../../../../../../state/atoms/auth-modal.atom";

const Like = ({ forSalePetId }: { forSalePetId: string }) => {
  const { user } = useUser();
  const { data: likesCount, mutate: mutateLikesCount } = useSWR(`/for-sale-pets/${forSalePetId}/likes-count`, () => forSalePetAPI.getLikesCount(forSalePetId).then(res => res.data));
  const { data: isLiked, mutate: mutateIsLiked } = useSWR(user ? `users/${user._id}/studs/${forSalePetId}/is-liked` : null, () =>
    forSalePetAPI.isLiked(forSalePetId, user?._id!).then(res => res.data)
  );
  const setAuthModal = useSetRecoilState(authModalAtom);
  const toast = useToast();
  const like = async () => {
    if (user) {
      try {
        mutateIsLiked(true, false);
        mutateLikesCount(likesCount ? likesCount + 1 : 1, false);
        await forSalePetAPI.like(forSalePetId, user._id);
        mutateIsLiked();
        mutateLikesCount();
      } catch (error) {}
    } else {
      toast({
        title: "You are not logged in",
        duration: 3000,
        status: "error",
        position: "top",
        variant: "subtle",
        isClosable: true
      });
      setAuthModal({ isOpen: true });
    }
  };
  const unLike = async () => {
    if (user) {
      try {
        mutateIsLiked(false, false);
        mutateLikesCount(likesCount ? likesCount - 1 : 0, false);
        await forSalePetAPI.unlike(forSalePetId, user._id);
        mutateIsLiked();
        mutateLikesCount();
      } catch (error) {}
    }
  };
  return (
    <>
      <Tooltip label={isLiked ? "Unlike" : "Like"} hasArrow>
        {isLiked ? (
          <Button minWidth='70px' leftIcon={<Icon as={HiHeart} h='5' w='5' color='red.400' />} fontSize='xs' onClick={unLike}>
            {likesCount}
          </Button>
        ) : (
          <Button leftIcon={<Icon as={HiOutlineHeart} h='5' w='5' />} fontSize='xs' onClick={like}>
            {likesCount}
          </Button>
        )}
      </Tooltip>
    </>
  );
};

export default Like;
