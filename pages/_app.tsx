import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'theme-ui';
import { theme } from '@styles/theme'
import { ErrorBoundary } from '@components/molecules/ErrorBoundary';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
