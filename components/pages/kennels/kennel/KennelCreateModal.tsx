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
import DrawerItemButtonWrapper from "../../../shared/Header/Drawer/DrawerItemButtonWrapper";
import { HiPlusCircle } from "react-icons/hi";
import Select from "react-select";
import useDogBreeds from "../../../../hooks/swr/use-dog-breeds";
import { useState, useEffect, useRef } from "react";

const KennelModal = ({ closeKennelModal }: { closeKennelModal: () => void }) => {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  const size = useBreakpointValue({ base: "full", md: "xl" });
  const { dogBreeds } = useDogBreeds();
  const [breedOptions, setBreedOptions] = useState<{ label: string; value: string }[]>();
  const submitEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setBreedOptions(dogBreeds?.map(dogBreed => ({ label: dogBreed.name, value: dogBreed.name })));
  }, [dogBreeds]);

  const [isLoading, setIsLoading] = useBoolean();

  const initialValues = {
    name: "",
    description: "",
    location: "",
    breeds: [] as string[]
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
      .required()
      .max(100),
    breeds: Yup.array()
      .required()
      .min(1, "Please select at least 1 breed")
      .label("Breeds")
  });

  const onSubmit = (values: any) => {
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
      .create(user?._id!, formData)
      .then(res => {
        mutateUser();
        setIsLoading.off();
        closeKennelModal();
        router.replace(router.asPath.split("#")[0]);
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
                <Text>Create kennel</Text>
                <Spacer />
                <Button onClick={() => submitEl.current!.click()} isLoading={isLoading} colorScheme='secondary' rounded='full'>
                  Submit
                </Button>
              </HStack>
            </ModalHeader>
            <ModalBody px='0' pt='0' pb='20'>
              <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ setFieldValue, values }) => (
                  <Form>
                    <Box position='relative'>
                      <KennelBannerInput
                        onChange={file => {
                          setFieldValue("deleteBanner", undefined);
                          setFieldValue("banner", file);
                        }}
                        onDelete={() => {
                          setFieldValue("deleteBanner", true);
                        }}
                      />
                      <KennelLogoInput
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

const KennelCreateModal = () => {
  const { isOpen, openModal, closeModal } = useHashBasedModal("#create-kennel");

  return (
    <>
      <DrawerItemButtonWrapper onClick={openModal} text='CREATE MY KENNEL' icon={HiPlusCircle} />
      {isOpen && <KennelModal closeKennelModal={closeModal} />}
    </>
  );
};

export default KennelCreateModal;
