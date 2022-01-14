import { MenuItem } from "@chakra-ui/menu";
import { HiOutlinePencil } from "react-icons/hi";
import useHashBasedModal from "../../../../../../../../hooks/use-hash-based-modal";
import { IStud } from "../../../../../../../../types";
import StudEditModal from "./EditStudModal";

const Edit = ({ stud }: { stud: IStud }) => {
  const { isOpen, openModal, closeModal } = useHashBasedModal("#edit-stud");
  return (
    <>
      <MenuItem icon={<HiOutlinePencil />} onClick={openModal}>
        Edit
      </MenuItem>
      {isOpen && <StudEditModal closeModal={closeModal} stud={stud} />}
    </>
  );
};

export default Edit;
