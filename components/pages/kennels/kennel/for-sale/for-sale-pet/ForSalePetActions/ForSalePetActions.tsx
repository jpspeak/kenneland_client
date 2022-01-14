import { ButtonGroup } from "@chakra-ui/button";
import { IForSalePet, IStud } from "../../../../../../../types";
import Like from "./Like";
import More from "./More/More";
import Share from "./Share";

const ForSalePetActions = ({ forSalePet }: { forSalePet: IForSalePet }) => {
  return (
    <ButtonGroup isAttached variant='outline' color='blackAlpha.700' float={{ md: "right" }}>
      <Like forSalePetId={forSalePet._id} />
      <Share />
      <More forSalePet={forSalePet} />
    </ButtonGroup>
  );
};

export default ForSalePetActions;
