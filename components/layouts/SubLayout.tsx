import { useBreakpointValue } from "@chakra-ui/media-query";
import Header from "../shared/Header";

const SubLayout: React.FC = ({ children }) => {
  const isMd = useBreakpointValue({ base: false, md: true });
  return (
    <>
      {isMd && <Header />}
      {children}
    </>
  );
};

export default SubLayout;
