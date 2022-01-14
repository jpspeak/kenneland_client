import { MenuItem } from "@chakra-ui/menu";
import { HiOutlinePencil } from "react-icons/hi";
import useHashBasedModal from "../../../../../../../../hooks/use-hash-based-modal";
import { IForSalePet } from "../../../../../../../../types";
import EditForSalePetModal from "./EditForSalePetModal";

const Edit = ({ forSalePet }: { forSalePet: IForSalePet }) => {
  const { isOpen, openModal, closeModal } = useHashBasedModal("#edit-for-sale-pet");
  return (
    <>
      <MenuItem icon={<HiOutlinePencil />} onClick={openModal}>
        Edit
      </MenuItem>
      {isOpen && <EditForSalePetModal closeModal={closeModal} forSalePet={forSalePet} />}
    </>
  );
};

export default Edit;
