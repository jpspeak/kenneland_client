import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { useBoolean } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Center, Flex, Text, VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Field, FieldAttributes, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import userAPI from "../../../api/user.api";
import useUser from "../../../hooks/swr/use-user";
import FormError from "../../shared/FormError";
import AvatarInput from "./AvatarInput";

const AccountInfo = () => {
  const { user, mutateUser } = useUser();
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [loading, setLoading] = useBoolean();
  const toast = useToast();

  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || ""
  };

  const onSubmit = async (values: any) => {
    setLoading.on();
    const formData = new FormData();
    for (const value in values) {
      formData.append(value, values[value]);
    }
    userAPI
      .update(user?._id!, formData)
      .then(() => {
        mutateUser();
        toast({
          title: "Account updated.",
          duration: 3000,
          status: "success",
          position: "top-right",
          isClosable: true
        });
        setErrors([]);
      })
      .catch(error => {
        const formErrors = error.response?.data?.errors;
        if (formErrors?.length !== 0) {
          setErrors(formErrors);
        }
      })
      .finally(() => setLoading.off());
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .label("First name")
      .required(),
    lastName: Yup.string()
      .label("Last name")
      .required()
  });

  return (
    <>
      <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ setFieldValue }) => (
          <Form>
            <VStack spacing='8'>
              <FormError errors={errors} />
              <Center>
                <AvatarInput
                  imageUrl={user?.displayPicture}
                  name={user?.firstName}
                  onChange={file => {
                    setFieldValue("displayPicture", file);
                  }}
                />
              </Center>
              <FormControl>
                <FormLabel fontSize='sm' textColor='blackAlpha.800'>
                  Email address
                </FormLabel>
                <Text alignSelf='start'>{user?.email}</Text>
              </FormControl>
              <Field name='firstName'>
                {({ field, form }: FieldAttributes<any>) => (
                  <FormControl isInvalid={!!form.errors.firstName && form.touched.firstName}>
                    <FormLabel fontSize='sm' textColor='blackAlpha.800'>
                      First Name
                    </FormLabel>
                    <Input {...field} type='text' placeholder='Enter your first name' />
                    <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='lastName'>
                {({ field, form }: FieldAttributes<any>) => (
                  <FormControl isInvalid={!!form.errors.lastName && form.touched.lastName}>
                    <FormLabel fontSize='sm' textColor='blackAlpha.800'>
                      Last Name
                    </FormLabel>
                    <Input {...field} type='text' placeholder='Enter your last name' />
                    <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </VStack>
            <Flex justifyContent='flex-end'>
              <Button type='submit' mt='6' colorScheme='secondary' rounded='full' isLoading={loading ? true : false}>
                Save
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AccountInfo;
