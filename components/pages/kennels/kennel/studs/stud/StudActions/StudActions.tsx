import { ButtonGroup } from "@chakra-ui/button";
import { IStud } from "../../../../../../../types";
import Like from "./Like";
import More from "./More/More";
import Share from "./Share";

const StudActions = ({ stud }: { stud: IStud }) => {
  return (
    <ButtonGroup isAttached variant='outline' color='blackAlpha.700' float={{ md: "right" }}>
      <Like studId={stud._id} />
      <Share />
      <More stud={stud} />
    </ButtonGroup>
  );
};

export default StudActions;
