import { Box, Text } from "@chakra-ui/layout";
import { useSetRecoilState } from "recoil";
import testAtom from "../../state/atoms/test.atom";
import Child from "./Child";

const Parent = () => {
  const setTest = useSetRecoilState(testAtom);
  return (
    <>
      <h1>This is the parent</h1>
      <button onClick={() => setTest(true)}>Click</button>
      <Child />
    </>
  );
};

export default Parent;
