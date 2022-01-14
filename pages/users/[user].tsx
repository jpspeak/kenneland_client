import { Center, Container, HStack, Text } from "@chakra-ui/layout";
import { NextPage } from "next";
import { Spinner } from "@chakra-ui/spinner";
import useSWR from "swr";
import { useRouter } from "next/router";
import userAPI from "../../api-routes/user.api";
import { Avatar } from "@chakra-ui/avatar";
import Icon from "@chakra-ui/icon";
import { HiOutlineCalendar } from "react-icons/hi";
import KennelCard from "../../components/shared/KennelCard";

const User: NextPage = () => {
  const router = useRouter();
  const userId = router.query.user as string;
  const { data: user } = useSWR(userId ? `/users${userId}` : null, () => userAPI.getOne(userId).then(res => res.data));
  if (!user) return <Spinner size='sm' />;
  return (
    <>
      <Container>
        <Center mt='20' flexDirection='column'>
          <Avatar src={user?.displayPicture} size='2xl' />
          <Text fontSize='2xl' mt='4' fontWeight='bold' color='blackAlpha.700'>
            {user?.firstName + " " + user?.lastName}
          </Text>
          <HStack mt='2' color='blackAlpha.700'>
            <Icon as={HiOutlineCalendar} />
            <Text>Joined Feb 14, 2021</Text>
          </HStack>
          {user.kennel && <KennelCard kennel={user?.kennel} />}
        </Center>
      </Container>
    </>
  );
};

export default User;
