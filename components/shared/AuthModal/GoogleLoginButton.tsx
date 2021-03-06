import GoogleLogin from "react-google-login";
import { IconButton, Icon, useBoolean, Button, useToast } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import FormError from "../FormError";
import authModalAtom from "../../../state/atoms/auth-modal.atom";
import authAPI from "../../../api-routes/auth.api";
import { setAccessToken, setRefreshToken } from "../../../services/token.service";
import useUser from "../../../hooks/swr/use-user";
import config from "../../../config";

const GoogleLoginButton = () => {
  const setAuthModal = useSetRecoilState(authModalAtom);
  const { mutateUser } = useUser();
  const [isLoading, setIsLoading] = useBoolean();
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const toast = useToast();

  const onSuccess = (googleResponse: any) => {
    setIsLoading.on();
    authAPI
      .googleLogin(googleResponse.tokenId)
      .then(({ data }: any) => {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setIsLoading.off();
        setAuthModal({ isOpen: false });
        mutateUser();
        toast({
          title: `Welcome to Kenneland`,
          duration: 3000,
          status: "success",
          position: "top",
          variant: "subtle",
          isClosable: true
        });
      })
      .catch(error => {
        const formErrors = error.response?.data?.errors;
        if (formErrors?.length !== 0) {
          setErrors(formErrors);
        }
        setIsLoading.off();
      });
  };

  const onFailure = async (googleResponse: any) => {
    console.log(googleResponse);
  };

  return (
    <>
      <FormError errors={errors} />
      <GoogleLogin
        clientId={config.GOOGLE_CLIENT_ID}
        render={renderProps => (
          // <IconButton isLoading={isLoading} title='Login with Google' aria-label='Login with google' shadow='base' isRound onClick={renderProps.onClick} icon={<Icon as={FcGoogle} w={5} h={5} />} />
          <Button
            isLoading={isLoading}
            title='Login with Google'
            color='blackAlpha.800'
            width='full'
            shadow='xs'
            rounded='lg'
            onClick={renderProps.onClick}
            leftIcon={<Icon as={FcGoogle} w={5} h={5} />}
          >
            Continue with Google
          </Button>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default GoogleLoginButton;
