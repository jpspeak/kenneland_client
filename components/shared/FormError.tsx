import { Alert, AlertIcon, Text, VStack } from "@chakra-ui/react";

interface FormErrorProps {
  errors: { message: string }[];
}
const FormError = ({ errors }: FormErrorProps) => (
  <>
    {errors?.length > 0 && (
      <Alert status='error' alignItems='start'>
        <AlertIcon />
        <VStack alignItems='start'>
          {errors.map((error, index) => (
            <Text key={index} color='red.500'>
              ● {error.message}
            </Text>
          ))}
        </VStack>
      </Alert>
    )}
  </>
);

export default FormError;
