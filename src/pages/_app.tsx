import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import "../app/globals.css";
import { UserProvider } from '@/context/userContext';

 
export default function MyApp({
  Component,
  pageProps,
}: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
 
MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppInitialProps> => {
  const ctx = await App.getInitialProps(context)

  return ctx
}
