import { Box, Heading, HStack, Spacer, Text, VStack } from "@chakra-ui/layout";
import KennelBanner from "./KennelBanner";
import KennelLogo from "./KennelLogo";
import { IoPawOutline } from "react-icons/io5";
import { HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineUser } from "react-icons/hi";
import KennelNav from "./KennelNav";
import { IKennel } from "../../../../types";
import Icon from "@chakra-ui/icon";
import KennelHeaderActions from "./KennelHeaderActions/KennelHeaderActions";

const KennelHeader = ({ kennel }: { kennel: IKennel }) => {
  const createdAt = new Date(kennel.createdAt);
  const formattedDate = createdAt.toLocaleDateString("default", { month: "short", year: "numeric" });
  const ownerFullName = kennel.user.name;

  return (
    <>
      <Box width='100%' maxW='container.lg' mt={{ md: 2 }} px={{ md: 4 }}>
        <Box bgColor='white' shadow='xs' rounded={{ md: "md" }} overflow='hidden'>
          <Box px={{ md: "4" }} pt={{ md: "4" }}>
            <Box position='relative'>
              <KennelBanner src={kennel.banner} />
              <KennelLogo src={kennel.displayPicture} name={kennel.name} />
            </Box>

            <HStack alignItems='self-start' px='4' py='2'>
              <Box width='30%'>
                <Box pb='50%'></Box>
              </Box>
              <Spacer />
              <KennelHeaderActions kennel={kennel} />
            </HStack>

            <VStack px='4' alignItems='start' spacing='2'>
              <Heading size='lg'>{kennel.name}</Heading>
              {kennel.location && (
                <HStack color='blackAlpha.700' spacing='1' fontSize={{ base: "sm", md: "md" }}>
                  <Icon as={HiOutlineLocationMarker} />
                  <Text>{kennel.location}</Text>
                </HStack>
              )}
              <HStack color='blackAlpha.700' spacing='1' fontSize={{ base: "sm", md: "md" }}>
                <Icon as={HiOutlineCalendar} />
                <Text>Created {formattedDate}</Text>
              </HStack>
              <HStack color='blackAlpha.700' spacing='1' fontSize={{ base: "sm", md: "md" }}>
                <Icon as={HiOutlineUser} />
                <Text>Owned by {ownerFullName}</Text>
              </HStack>
              <HStack color='blackAlpha.700' spacing='1' fontSize={{ base: "sm", md: "md" }}>
                <Icon as={IoPawOutline} />
                <Text>{kennel.breeds.join(", ")}</Text>
              </HStack>

              <Text py='4'>{kennel.description}</Text>
            </VStack>
          </Box>
          <KennelNav kennelId={kennel._id} />
        </Box>
      </Box>
    </>
  );
};

export default KennelHeader;
