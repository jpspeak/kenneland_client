import { useState } from "react";
import { IconButton, Icon, useBoolean } from "@chakra-ui/react";
import { FaFacebookF } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import ReactFacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import FormError from "../FormError";
import authModalAtom from "../../../state/atoms/auth-modal.atom";
import authAPI from "../../../api/auth.api";
import useUser from "../../../hooks/swr/use-user";
import { setAccessToken, setRefreshToken } from "../../../services/token.service";

const FacebookLoginButton = () => {
  const setAuthModal = useSetRecoilState(authModalAtom);
  const { mutateUser } = useUser();
  const [isLoading, setIsLoading] = useBoolean();
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const responseFacebook = (response: any) => {
    if (response.status !== "unknown") {
      authAPI
        .facebookLogin(response.accessToken)
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
    }
  };
  return (
    <>
      <FormError errors={errors} />
      <ReactFacebookLogin
        appId='340717384422875'
        callback={responseFacebook}
        render={(renderProps: any) => (
          <IconButton
            isLoading={isLoading}
            title='Login with Facebook'
            aria-label='Login with google'
            shadow='base'
            isRound
            onClick={renderProps.onClick}
            icon={<Icon as={FaFacebookF} color='facebook.500' w={5} h={5} />}
          />
        )}
      />
    </>
  );
};

export default FacebookLoginButton;
