import { Button, FormControl, FormErrorMessage, FormLabel, Input, useBoolean, VStack } from "@chakra-ui/react";
import { Field, FieldAttributes, Form, Formik } from "formik";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import * as Yup from "yup";

import { setAccessToken, setRefreshToken } from "../../../services/token.service";
import authModalAtom from "../../../state/atoms/auth-modal.atom";
import FormError from "../FormError";
import userAtom from "../../../state/atoms/user.atom";
import authAPI from "../../../api-routes/auth.api";
import useUser from "../../../hooks/swr/use-user";

interface ILoginForm {
  email: string;
  password: string;
}
const LocalLoginForm = () => {
  const setAuthModal = useSetRecoilState(authModalAtom);
  const { mutateUser } = useUser();
  const [isLoading, setIsLoading] = useBoolean();
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const initialValues = {
    email: "",
    password: ""
  };

  const onSubmit = (formData: ILoginForm) => {
    setIsLoading.on();
    authAPI
      .login(formData)
      .then(({ data }: any) => {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setIsLoading.off();
        setAuthModal({ isOpen: false });
        mutateUser();
      })
      .catch(error => {
        const formErrors = error.response?.data?.errors;
        if (formErrors?.length !== 0) {
          setErrors(formErrors);
        }
        setIsLoading.off();
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .label("Email")
      .email()
      .required(),
    password: Yup.string()
      .label("Password")
      .required()
  });

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          <VStack spacing='4'>
            <FormError errors={errors} />
            <Field name='email'>
              {({ field, form }: FieldAttributes<any>) => (
                <FormControl isInvalid={!!form.errors.email && form.touched.email}>
                  <FormLabel fontSize='sm' textColor='gray.500'>
                    Email address
                  </FormLabel>
                  <Input {...field} type='email' placeholder='Enter your email address' />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='password'>
              {({ field, form }: FieldAttributes<any>) => (
                <FormControl isInvalid={!!form.errors.password && form.touched.password}>
                  <FormLabel fontSize='sm' textColor='gray.500'>
                    Password
                  </FormLabel>
                  <Input {...field} type='password' placeholder='Enter your password' />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </VStack>
          <Button type='submit' w='full' rounded='lg' colorScheme='primary' mt='6' isLoading={isLoading}>
            Login
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default LocalLoginForm;
