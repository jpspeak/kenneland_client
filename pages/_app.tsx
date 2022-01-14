import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import MainLayout from '../components/layouts/MainLayout'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import NProgress from 'nprogress';
import Router, { useRouter } from 'next/router';
import "nprogress/nprogress.css";
import AuthModal from "../components/shared/AuthModal"
import { RecoilRoot } from 'recoil'
import { extendTheme } from "@chakra-ui/react"
import {useEffect} from "react"
import GlobalLoadingOverlay from '../components/shared/GlobalLoadingOverlay'
import ErrorPage from "next/error"
import ChatDrawer from '../components/shared/ChatDrawer/ChatDrawer'
import { ChatDrawerProvider } from '../state/context/chat-drawer-context'
import SocketProvider from '../state/context/socket-context'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const theme = extendTheme({
  colors: {
    primary: {
      50: "#FAF5FF",
      100: "#E9D8FD",
      200: "#D6BCFA",
      300: "#B794F4",
      400: "#9F7AEA",
      500: "#805AD5",
      600: "#6B46C1",
      700: "#553C9A",
      800: "#44337A",
      900: "#322659"
    },
    secondary: {
      50: "#EBF8FF",
      100: "#BEE3F8",
      200: "#90CDF4",
      300: "#63B3ED",
      400: "#4299E1",
      500: "#3182CE",
      600: "#2B6CB0",
      700: "#2C5282",
      800: "#2A4365",
      900: "#1A365D"
    },
  },
  
})

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppPropsWithLayout ) {

  const router = useRouter()

  useEffect(() => {
    const currentUrl = globalThis.sessionStorage?.getItem('currentUrl')
    if(currentUrl){
      globalThis.sessionStorage?.setItem('prevUrl', currentUrl)
    }
    globalThis.sessionStorage?.setItem('currentUrl', router.asPath)
  }, [router.asPath])

  const getLayout = Component.getLayout || ((page)=><MainLayout>{page}</MainLayout>)


  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <GlobalLoadingOverlay />
        <AuthModal />
        <SocketProvider>
          <ChatDrawerProvider>
            {/* <ChatDrawer /> */}
            {pageProps.errorCode ? 
              getLayout(<ErrorPage  statusCode={pageProps.errorCode}/>): 
              getLayout(<Component {...pageProps} />)
            }   
          </ChatDrawerProvider>
        </SocketProvider>           
      </ChakraProvider>
    </RecoilRoot>
  )
}
export default MyApp
