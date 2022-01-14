import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { useBoolean, useDisclosure } from "@chakra-ui/hooks";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Flex, VStack } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Link, useToast } from "@chakra-ui/react";
import { Field, FieldAttributes, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import userAPI from "../../../api/user.api";
import FormError from "../../shared/FormError";

const ChangePassword = ({ onClose }: { onClose: () => void }) => {
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [showCrntPwd, setShowCrntPwd] = useBoolean();
  const [showNewPwd, setShowNewPwd] = useBoolean();
  const [showPwdCfm, setShowPwdCfm] = useBoolean();
  const [isLoading, setIsLoading] = useBoolean();
  const toast = useToast();

  const initialValues = {
    passwordCurrent: "",
    passwordNew: "",
    passwordNewConfirm: ""
  };

  const onSubmit = (formData: typeof initialValues) => {
    setIsLoading.on();
    userAPI
      .updatePassword(formData)
      .then(() => {
        toast({
          title: "Password updated.",
          duration: 3000,
          status: "success",
          position: "top-right",
          isClosable: true
        });
        setErrors([]);
        onClose();
      })
      .catch(error => {
        const formErrors = error.response?.data?.errors;
        if (formErrors?.length !== 0) {
          setErrors(formErrors);
        }
      })
      .finally(() => setIsLoading.off());
  };

  const validationSchema = Yup.object({
    passwordCurrent: Yup.string()
      .label("Current Password")
      .required("Required")
      .min(8),
    passwordNew: Yup.string()
      .label("New Password")
      .required("Required")
      .min(8),
    passwordNewConfirm: Yup.string()
      .label("New password confirmation")
      .required("Required")
      .oneOf([Yup.ref("passwordNew"), null], "Password mismatch")
  });
  return (
    <>
      {true && (
        <>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
              <VStack spacing='8'>
                <FormError errors={errors} />
                <Field name='passwordCurrent'>
                  {({ field, form }: FieldAttributes<any>) => (
                    <FormControl isInvalid={!!form.errors.passwordCurrent && form.touched.passwordCurrent}>
                      <FormLabel fontSize='sm' textColor='blackAlpha.800'>
                        Current Password
                      </FormLabel>
                      <InputGroup size='md'>
                        <Input {...field} pr='4.5rem' type={showCrntPwd ? "text" : "password"} placeholder='Enter your current password' />
                        <InputRightElement width='4.5rem'>
                          <Button h='1.75rem' size='sm' onClick={setShowCrntPwd.toggle}>
                            {showCrntPwd ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{form.errors.passwordCurrent}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='passwordNew'>
                  {({ field, form }: FieldAttributes<any>) => (
                    <FormControl isInvalid={!!form.errors.passwordNew && form.touched.passwordNew}>
                      <FormLabel fontSize='sm' textColor='blackAlpha.800'>
                        New Password
                      </FormLabel>
                      <InputGroup size='md'>
                        <Input {...field} pr='4.5rem' type={showNewPwd ? "text" : "password"} placeholder='Enter your new password' />
                        <InputRightElement width='4.5rem'>
                          <Button h='1.75rem' size='sm' onClick={setShowNewPwd.toggle}>
                            {showNewPwd ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{form.errors.passwordNew}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='passwordNewConfirm'>
                  {({ field, form }: FieldAttributes<any>) => (
                    <FormControl isInvalid={!!form.errors.passwordNewConfirm && form.touched.passwordNewConfirm}>
                      <FormLabel fontSize='sm' textColor='blackAlpha.800'>
                        Confirm New Password
                      </FormLabel>
                      <InputGroup size='md'>
                        <Input {...field} pr='4.5rem' type={showPwdCfm ? "text" : "password"} placeholder='Confirm your new password' />
                        <InputRightElement width='4.5rem'>
                          <Button h='1.75rem' size='sm' onClick={setShowPwdCfm.toggle}>
                            {showPwdCfm ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{form.errors.passwordNewConfirm}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </VStack>
              <Flex justifyContent='flex-end' mt='12'>
                <Button type='submit' colorScheme='secondary' rounded='full' isLoading={isLoading}>
                  Update password
                </Button>
              </Flex>
            </Form>
          </Formik>
        </>
      )}
    </>
  );
};

function ChangePasswordModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Link onClick={onOpen} alignSelf='start'>
        Change password
      </Link>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent rounded='xl' mx='2'>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton rounded='full' />
          <ModalBody p='6'>
            <ChangePassword onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export default ChangePasswordModal;
