import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'theme-ui';
import { theme } from '@styles/theme';
import { appWithTranslation } from 'next-i18next';
import { ErrorBoundary } from '@components/molecules/ErrorBoundary';
import StoreProvider from '@store/StoreProvider';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default appWithTranslation(App);