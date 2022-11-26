import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'theme-ui';
import { theme } from '@styles/theme';
import { appWithTranslation } from 'next-i18next';
import { ErrorBoundary } from '@components/molecules/ErrorBoundary';
import StoreProvider from '@store/StoreProvider';
import { ServiceProvider } from '@hooks/ServiceProvider';
import { Layout } from '@components/organisms/Layout';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary>
      <ServiceProvider>
        <ThemeProvider theme={theme}>
          <StoreProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </StoreProvider>
        </ThemeProvider>
      </ServiceProvider>
    </ErrorBoundary>
  );
};

export default appWithTranslation(App);