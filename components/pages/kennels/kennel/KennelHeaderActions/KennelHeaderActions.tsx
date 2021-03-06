import { IconButton } from "@chakra-ui/button";
import { useRouter } from "next/router";
import { BiDotsVerticalRounded } from "react-icons/bi";
import useUser from "../../../../../hooks/swr/use-user";
import { IKennel } from "../../../../../types";
import ContactKennelModal from "../../../../shared/ContactKennelModal";
import KennelEditModal from "../KennelEditModal";
import Follow from "./Follow";

const KennelHeaderActions = ({ kennel }: { kennel: IKennel }) => {
  const { user } = useUser();
  const router = useRouter();
  const isOwner = user?.kennel?._id === router.query.kennel;
  return (
    <>
      {user && isOwner ? (
        <KennelEditModal />
      ) : (
        <>
          <ContactKennelModal kennel={kennel} />
          <Follow kennelId={kennel._id} />
          <IconButton aria-label='More options' variant='outline' rounded='full' size='sm'>
            <BiDotsVerticalRounded />
          </IconButton>
        </>
      )}
    </>
  );
};

export default KennelHeaderActions;
