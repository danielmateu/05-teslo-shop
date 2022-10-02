import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import useSWR, { SWRConfig } from 'swr'

import { ThemeProvider } from '@mui/system'
import { lightTheme } from '../themes'

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <SWRConfig 
    value={{
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}
  >
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
    
  </SWRConfig>
    
  )
}

export default MyApp
