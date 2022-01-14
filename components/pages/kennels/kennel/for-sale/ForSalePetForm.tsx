import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box, Flex, HStack, VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { Field, FieldAttributes, Form, Formik } from "formik";
import Select from "react-select";
import useDogBreeds from "../../../../../hooks/swr/use-dog-breeds";
import UploadPreview from "../../../../shared/UploadPreview";
import { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { useToast } from "@chakra-ui/toast";

interface ForSaleFormProps {
  initialValues: {
    breed: string;
    price: string | number;
    description: string;
  };
  onSave: (formData: FormData) => void;
  forSalePetImages?: string[];
  isLoading: boolean;
}
const ForSalePetForm = ({ initialValues, onSave, forSalePetImages, isLoading }: ForSaleFormProps) => {
  const { dogBreeds } = useDogBreeds();
  const [breedOptions, setBreedOptions] = useState<{ label: string; value: string }[]>();
  let formData = useRef(new FormData()).current;
  const toast = useToast();

  useEffect(() => {
    setBreedOptions(dogBreeds?.map(dogBreed => ({ label: dogBreed.name, value: dogBreed.name })));
  }, [dogBreeds]);

  const validationSchema = Yup.object({
    breed: Yup.string()
      .label("Breed")
      .required(),
    price: Yup.number()
      .label("Price")
      .required()
      .min(0)
      .max(1000000),
    dateOfBirth: Yup.date()
      .label("Date of birth")
      .required(),
    location: Yup.string()
      .label("Location")
      .required()
      .max(100),
    description: Yup.string()
      .label("Description")
      .max(1000)
  });

  const onChangeImage = (images: File[]) => {
    formData.delete("images");
    images.forEach(image => {
      formData.append("images", image);
    });
  };

  const onDeleteUploaded = (deleteUploadedImages: string[]) => {
    formData.delete("deleteImages");
    deleteUploadedImages?.forEach(image => {
      formData.append("deleteImages", image);
    });
  };

  const onSubmit = (values: any) => {
    for (const value in values) {
      formData.set(value, values[value]);
    }
    const totalImagesCount = (forSalePetImages?.length || 0) - formData.getAll("deleteImages").length + formData.getAll("images").length;
    if (totalImagesCount === 0) {
      toast({
        title: "Please upload at least 1 image",
        duration: 3000,
        status: "error",
        position: "top",
        variant: "left-accent",
        isClosable: true
      });
    } else {
      onSave(formData);
    }
  };
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ setFieldValue, values }) => (
          <Form>
            <Box p='6'>
              <VStack spacing='4' alignItems='start'>
                <Field name='breed'>
                  {({ field, form }: FieldAttributes<any>) => (
                    <FormControl isInvalid={!!form.errors.breed && form.touched.breed}>
                      <FormLabel fontSize='sm' textColor='blackAlpha.800'>
                        Breed
                      </FormLabel>
                      <Select
                        name={field.name}
                        onBlur={() => {
                          form.setTouched({ ...form.touched, [field.name]: true });
                        }}
                        onChange={data => setFieldValue("breed", data?.value || "")}
                        value={breedOptions?.filter(b => b.value === values.breed)}
                        placeholder='Select breed'
                        options={dogBreeds?.map(dogBreed => ({ label: dogBreed.name, value: dogBreed.name }))}
                        isClearable
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            padding: "1px 5px",
                            borderColor: "#E2E8F0",
                            border: !!form.errors.breed && form.touched.breed ? "2px solid #E53E3E" : "1px solid #E2E8F0",
                            borderRadius: "8px",
                            boxShadow: "none",
                            "&:hover": {
                              boxShadow: "none"
                            }
                          })
                        }}
                      />
                      <FormErrorMessage>{form.errors.breed}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='sex'>
                  {({ field, form }: FieldAttributes<any>) => (
                    <FormControl isInvalid={!!form.errors.sex && form.touched.sex}>
                      <FormLabel fontSize='sm' textColor='gray.600'>
                        Sex
                      </FormLabel>
                      <RadioGroup {...field}>
                        <HStack spacing='24px'>
                          <Radio {...field} value='Male'>
                            Male
                          </Radio>
                          <Radio {...field} value='Female'>
                            Female
                          </Radio>
                        </HStack>
                      </RadioGroup>
                      <FormErrorMessage>{form.errors.sex}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='dateOfBirth'>
                  {({ field, form }: FieldAttributes<any>) => (
                    <FormControl isInvalid={!!form.errors.dateOfBirth && form.touched.dateOfBirth}>
                      <FormLabel fontSize='sm' textColor='gray.600'>
                        Date of birth
                      </FormLabel>
                      <InputGroup>
                        <Input {...field} type='date' focusBorderColor='brand.500' />
                      </InputGroup>
                      <FormErrorMessage>{form.errors.dateOfBirth}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='price'>
                  {({ field, form }: FieldAttributes<any>) => (
                    <FormControl isInvalid={!!form.errors.price && form.touched.price}>
                      <FormLabel fontSize='sm' textColor='gray.600'>
                        Price
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em' zIndex={0}>
                          ₱
                        </InputLeftElement>
                        <Input {...field} type='number' placeholder='Enter price' focusBorderColor='brand.500' />
                      </InputGroup>
                      <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='description'>
                  {({ field, form }: FieldAttributes<any>) => (
                    <FormControl isInvalid={!!form.errors.description && form.touched.description}>
                      <FormLabel fontSize='sm' textColor='gray.600'>
                        Description
                      </FormLabel>
                      <Textarea {...field} placeholder='Add description or any additional details here' focusBorderColor='brand.500' />
                      <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='location'>
                  {({ field, form }: FieldAttributes<any>) => (
                    <FormControl isInvalid={!!form.errors.location && form.touched.location}>
                      <FormLabel fontSize='sm' textColor='blackAlpha.800'>
                        Current location
                      </FormLabel>
                      <Input {...field} type='text' placeholder='Enter current location of your stud' />
                      <FormErrorMessage>{form.errors.location}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <FormControl>
                  <FormLabel fontSize='sm' textColor='gray.600'>
                    Image
                  </FormLabel>
                  <FormHelperText>Upload up to 6 images</FormHelperText>
                </FormControl>
                <UploadPreview max={6} onChange={onChangeImage} onDeleteUploaded={onDeleteUploaded} uploadedImagesUrl={forSalePetImages} />
              </VStack>
            </Box>

            <Flex p='6' justifyContent='end'>
              <Button isLoading={isLoading} variant='solid' type='submit' width={{ base: "100%", md: "auto" }} colorScheme='secondary' rounded='full'>
                Save
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ForSalePetForm;
