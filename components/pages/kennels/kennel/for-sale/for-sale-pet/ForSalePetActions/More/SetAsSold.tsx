import { MenuItem } from "@chakra-ui/menu";
import { HiOutlineBan } from "react-icons/hi";
import forSalePetAPI from "../../../../../../../../api/for-sale-pet.api";
import useForSalePet from "../../../../../../../../hooks/swr/use-for-sale-pet";
import useUser from "../../../../../../../../hooks/swr/use-user";

const SetAsSold = ({ forSalePetId }: { forSalePetId: string }) => {
  const { user } = useUser();
  const { mutateForSalePet } = useForSalePet(forSalePetId);

  const setAsSold = async () => {
    if (user) {
      try {
        await forSalePetAPI.setAsSold(forSalePetId, user._id);
        mutateForSalePet();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <MenuItem icon={<HiOutlineBan />} onClick={setAsSold}>
        Set as sold
      </MenuItem>
    </>
  );
};

export default SetAsSold;
