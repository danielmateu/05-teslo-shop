import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import useSWR, { SWRConfig } from 'swr'

import { ThemeProvider } from '@mui/system'
import { lightTheme } from '../themes'
import { AuthProvider, CartProvider, UiProvider } from '../context'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {

  /* A hack to prevent the page from rendering twice. */
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);
  if (!showChild) {
    return <></>;
  }

  return (

    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <AuthProvider>
        <CartProvider>
          <UiProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UiProvider>
        </CartProvider>
      </AuthProvider>
    </SWRConfig>

  )
}

export default MyApp
