import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, useBoolean, VStack } from "@chakra-ui/react";
import * as Yup from "yup";
import { Field, FieldAttributes, Form, Formik } from "formik";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import authModalAtom from "../../../state/atoms/auth-modal.atom";
import { setAccessToken, setRefreshToken } from "../../../services/token.service";
import FormError from "../FormError";
import authAPI from "../../../api-routes/auth.api";
import useUser from "../../../hooks/swr/use-user";

interface IForm {
  email: string;
  password: string;
  passwordConfirm: string;
}

const Register = () => {
  const setAuthModal = useSetRecoilState(authModalAtom);
  const { mutateUser } = useUser();
  const [isLoading, setIsLoading] = useBoolean();
  const [showPwd, setShowPwd] = useBoolean();
  const [showPwdCfm, setShowPwdCfm] = useBoolean();
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const validationSchema = Yup.object({
    email: Yup.string()
      .label("Email")
      .required("Required")
      .email(),
    firstName: Yup.string()
      .label("First Name")
      .required("Required"),
    lastName: Yup.string()
      .label("Email")
      .required("Required"),
    password: Yup.string()
      .label("Password")
      .required("Required")
      .min(8),
    passwordConfirm: Yup.string()
      .label("Password confirmation")
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Password mismatch")
  });
  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: ""
  };
  const onSubmit = (formData: IForm) => {
    setIsLoading.on();
    authAPI
      .register(formData)
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
            <Field name='firstName'>
              {({ field, form }: FieldAttributes<any>) => (
                <FormControl isInvalid={!!form.errors.firstName && form.touched.firstName}>
                  <FormLabel fontSize='sm' textColor='gray.500'>
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
                  <FormLabel fontSize='sm' textColor='gray.500'>
                    Last Name
                  </FormLabel>
                  <Input {...field} type='text' placeholder='Enter your last name' />
                  <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name='password'>
              {({ field, form }: FieldAttributes<any>) => (
                <FormControl isInvalid={!!form.errors.password && form.touched.password}>
                  <FormLabel fontSize='sm' textColor='gray.500'>
                    Create Password
                  </FormLabel>
                  <InputGroup size='md'>
                    <Input {...field} pr='4.5rem' type={showPwd ? "text" : "password"} placeholder='Create your password' />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={setShowPwd.toggle}>
                        {showPwd ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='passwordConfirm'>
              {({ field, form }: FieldAttributes<any>) => (
                <FormControl id='confirmPassword' isInvalid={!!form.errors.passwordConfirm && form.touched.passwordConfirm}>
                  <FormLabel fontSize='sm' textColor='gray.500'>
                    Confirm Password
                  </FormLabel>
                  <InputGroup size='md'>
                    <Input {...field} pr='4.5rem' type={showPwdCfm ? "text" : "password"} placeholder='Confirm your password' />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={setShowPwdCfm.toggle}>
                        {showPwdCfm ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{form.errors.passwordConfirm}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </VStack>
          <Button type='submit' w='full' colorScheme='primary' rounded='lg' mt='6' isLoading={isLoading}>
            Register
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default Register;
