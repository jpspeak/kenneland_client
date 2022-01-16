import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { useBoolean } from "@chakra-ui/hooks";
import { CloseIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box, HStack, Spacer, Text, VStack } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Textarea } from "@chakra-ui/textarea";
import { Field, FieldAttributes, Form, Formik } from "formik";
import { useRouter } from "next/router";
import kennelAPI from "../../../../api-routes/kennel.api";
import useHashBasedModal from "../../../../hooks/use-hash-based-modal";
import useUser from "../../../../hooks/swr/use-user";
import * as Yup from "yup";
import KennelLogoInput from "./KennelLogoInput";
import KennelBannerInput from "./KennelBannerInput";
import { useRef, useState, useEffect } from "react";
import Select from "react-select";
import useDogBreeds from "../../../../hooks/swr/use-dog-breeds";
import useKennel from "../../../../hooks/swr/use-kennel";

const KennelModal = ({ closeKennelModal }: { closeKennelModal: () => void }) => {
  const { user, mutateUser } = useUser();
  const { mutateKennel } = useKennel(user?.kennel?._id!);
  const router = useRouter();
  const size = useBreakpointValue({ base: "full", md: "xl" });
  const [isLoading, setIsLoading] = useBoolean();
  const submitEl = useRef<HTMLInputElement>(null);
  const { dogBreeds } = useDogBreeds();
  const [breedOptions, setBreedOptions] = useState<{ label: string; value: string }[]>();

  useEffect(() => {
    setBreedOptions(dogBreeds?.map(dogBreed => ({ label: dogBreed.name, value: dogBreed.name })));
  }, [dogBreeds]);

  const initialValues = {
    name: user?.kennel?.name || "",
    description: user?.kennel?.description || "",
    location: user?.kennel?.location || "",
    breeds: user?.kennel?.breeds || [],
    email: user?.kennel?.email || "",
    mobileNumber: user?.kennel?.mobileNumber || ""
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .label("Kennel name")
      .required()
      .max(30),
    description: Yup.string()
      .label("Description")
      .max(1000),
    location: Yup.string()
      .label("Location")
      .max(100),
    breeds: Yup.array()
      .required()
      .min(1, "Please select at least 1 breed")
      .label("Breeds"),
    email: Yup.string()
      .label("Email")
      .email(),
    mobileNumber: Yup.string()
      .label("Mobile number")
      .max(12)
  });

  const onSubmit = (values: any) => {
    const kennelId = router.query.kennel as string;
    setIsLoading.on();
    const formData = new FormData();
    for (const value in values) {
      if (Array.isArray(values[value])) {
        (values[value] as string[]).forEach(arrValue => {
          formData.append(value, arrValue);
        });
      } else {
        formData.append(value, values[value]);
      }
    }
    kennelAPI
      .update(kennelId, formData)
      .then(res => {
        mutateUser();
        setIsLoading.off();
        mutateKennel();
        closeKennelModal();
      })
      .catch(err => {
        setIsLoading.off();
      });
  };

  return (
    <>
      <>
        <Modal isOpen={true} onClose={closeKennelModal} size={size} scrollBehavior='inside'>
          <ModalOverlay />
          <ModalContent rounded={{ base: "none", md: "xl" }} minWidth='320px' width='full' overflow='hidden'>
            <ModalHeader p='4'>
              <HStack>
                <IconButton rounded='full' position='relative' size='sm' variant='ghost' aria-label='Close' mr={8} icon={<CloseIcon />} onClick={closeKennelModal} />
                <Text>Edit kennel</Text>
                <Spacer />
                <Button onClick={() => submitEl.current!.click()} isLoading={isLoading} colorScheme='secondary' rounded='full'>
                  Save
                </Button>
              </HStack>
            </ModalHeader>

            <ModalBody px='0' pt='0' pb='20'>
              <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ setFieldValue, values }) => (
                  <Form>
                    <Box position='relative'>
                      <KennelBannerInput
                        imageUrl={user?.kennel?.banner}
                        onChange={file => {
                          setFieldValue("deleteBanner", undefined);
                          setFieldValue("banner", file);
                        }}
                        onDelete={() => {
                          setFieldValue("deleteBanner", true);
                        }}
                      />
                      <KennelLogoInput
                        imageUrl={user?.kennel?.displayPicture}
                        onChange={file => {
                          setFieldValue("displayPicture", file);
                        }}
                      />
                    </Box>
                    <Box px='4'>
                      <Box width='30%'>
                        <Box pb='50%'></Box>
                      </Box>
                      <VStack spacing='4' my='4'>
                        <Field name='name'>
                          {({ field, form }: FieldAttributes<any>) => (
                            <FormControl isInvalid={!!form.errors.name && form.touched.name}>
                              <FormLabel fontSize='sm' textColor='blackAlpha.800'>
                                Kennel Name
                              </FormLabel>
                              <Input {...field} type='text' placeholder='Enter name of your kennel' />
                              <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name='description'>
                          {({ field, form }: FieldAttributes<any>) => (
                            <FormControl isInvalid={!!form.errors.description && form.touched.description}>
                              <FormLabel fontSize='sm' textColor='blackAlpha.800'>
                                Description
                              </FormLabel>
                              <Textarea {...field} placeholder='Tell people about your kennel' />
                              <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name='location'>
                          {({ field, form }: FieldAttributes<any>) => (
                            <FormControl isInvalid={!!form.errors.location && form.touched.location}>
                              <FormLabel fontSize='sm' textColor='blackAlpha.800'>
                                Location
                              </FormLabel>
                              <Input {...field} type='text' placeholder='Enter location of your kennel' />
                              <FormErrorMessage>{form.errors.location}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name='breeds'>
                          {({ field, form }: FieldAttributes<any>) => (
                            <FormControl isInvalid={!!form.errors.breeds && form.touched.breeds}>
                              <FormLabel fontSize='sm' textColor='blackAlpha.800'>
                                Breed(s)
                              </FormLabel>
                              <Select
                                isMulti
                                name={field.name}
                                onBlur={() => {
                                  form.setTouched({ ...form.touched, [field.name]: true });
                                }}
                                onChange={data => setFieldValue("breeds", data.map(d => d.value) || [])}
                                // value={breedOptions?.filter(b => values.breeds.includes(b.value))}
                                defaultValue={breedOptions?.filter(b => values.breeds.includes(b.value))}
                                placeholder='Select a breed you have in your kennel'
                                options={dogBreeds?.map(dogBreed => ({ label: dogBreed.name, value: dogBreed.name }))}
                                isClearable
                                styles={{
                                  control: (base, state) => ({
                                    ...base,
                                    padding: "1px 5px",
                                    borderColor: "#E2E8F0",
                                    border: !!form.errors.breeds && form.touched.breeds ? "2px solid #E53E3E" : "1px solid #E2E8F0",
                                    borderRadius: "8px",
                                    boxShadow: "none",
                                    "&:hover": {
                                      boxShadow: "none"
                                    }
                                  })
                                }}
                              />
                              <FormErrorMessage>{form.errors.breeds}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Text pt='4' alignSelf='start' fontWeight='bold' color='blackAlpha.800'>
                          Contact
                        </Text>
                        <Field name='email'>
                          {({ field, form }: FieldAttributes<any>) => (
                            <FormControl isInvalid={!!form.errors.email && form.touched.email}>
                              <FormLabel fontSize='sm' textColor='blackAlpha.800'>
                                Email
                              </FormLabel>
                              <Input {...field} type='text' />
                              <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name='mobileNumber'>
                          {({ field, form }: FieldAttributes<any>) => (
                            <FormControl isInvalid={!!form.errors.mobileNumber && form.touched.mobileNumber}>
                              <FormLabel fontSize='sm' textColor='blackAlpha.800'>
                                Mobile number
                              </FormLabel>
                              <Input {...field} type='tel' />
                              <FormErrorMessage>{form.errors.mobileNumber}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </VStack>
                    </Box>
                    <input ref={submitEl} type='submit' hidden />
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

const KennelEditModal = () => {
  const { isOpen, openModal, closeModal } = useHashBasedModal("#edit-kennel");
  const buttonSize = useBreakpointValue({ base: "xs", md: "sm" });
  return (
    <>
      <Button onClick={openModal} rounded='full' p='4' size={buttonSize} variant='outline'>
        Edit kennel
      </Button>
      {isOpen && <KennelModal closeKennelModal={closeModal} />}
    </>
  );
};

export default KennelEditModal;
