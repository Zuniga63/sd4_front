import type { AppProps } from 'next/app';

import 'src/styles/globals.css';
import { emCache } from 'src/utils/emotionCache';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from 'src/store';

export default function App({ Component, pageProps }: AppProps) {
  // --------------------------------------------------------------------------
  // MANTINE CONFIG
  // --------------------------------------------------------------------------
  emCache(); // Cache for use mantine with tailwind

  return (
    <MantineProvider
      withGlobalStyles
      theme={{
        colorScheme: 'dark',
        fontFamily: 'inherit',
      }}
    >
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </MantineProvider>
  );
}
