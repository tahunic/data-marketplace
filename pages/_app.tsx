import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'theme-ui';
import { theme } from '@styles/theme'
import { appWithTranslation } from "next-i18next";
import { ErrorBoundary } from '@components/molecules/ErrorBoundary';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default appWithTranslation(App);