import type { AppProps } from 'next/app';

import 'src/styles/globals.css';
import { emCache } from 'src/utils/emotionCache';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useLocalStorage, useHotkeys } from '@mantine/hooks';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  // --------------------------------------------------------------------------
  // MANTINE CONFIG
  // --------------------------------------------------------------------------
  emCache(); // Cache for use mantine with tailwind
  const KEY_THEME = 'mantine-color-scheme';

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: KEY_THEME,
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  const setGlobalDarkTheme = (value?: ColorScheme) => {
    let theme: ColorScheme = value || 'dark';

    if (!value && window) {
      const localTheme = JSON.parse(localStorage[KEY_THEME] || null);
      if (localTheme && localTheme === 'light') theme = 'light';
    }

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleColorScheme = (value?: ColorScheme) => {
    const theme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(theme);
    setGlobalDarkTheme(theme);
  };

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  useEffect(() => {
    setGlobalDarkTheme();
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        theme={{
          colorScheme,
          fontFamily: 'inherit',
        }}
      >
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
