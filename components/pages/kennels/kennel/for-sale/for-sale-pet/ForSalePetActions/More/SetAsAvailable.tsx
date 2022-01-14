import { MenuItem } from "@chakra-ui/menu";
import { HiOutlineCheckCircle } from "react-icons/hi";
import forSalePetAPI from "../../../../../../../../api-routes/for-sale-pet.api";
import useForSalePet from "../../../../../../../../hooks/swr/use-for-sale-pet";
import useUser from "../../../../../../../../hooks/swr/use-user";

const SetAsAvailable = ({ forSalePetId }: { forSalePetId: string }) => {
  const { user } = useUser();
  const { mutateForSalePet } = useForSalePet(forSalePetId);

  const setAsAvailable = async () => {
    if (user) {
      try {
        await forSalePetAPI.setAsAvailable(forSalePetId, user._id);
        mutateForSalePet();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <MenuItem icon={<HiOutlineCheckCircle />} onClick={setAsAvailable}>
        Set as available
      </MenuItem>
    </>
  );
};

export default SetAsAvailable;
