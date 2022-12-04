import type { AppProps } from 'next/app';

import '../styles/globals.css';
import { emCache } from 'utils/emotionCache';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useLocalStorage, useHotkeys } from '@mantine/hooks';

export default function App({ Component, pageProps }: AppProps) {
  // --------------------------------------------------------------------------
  // MANTINE CONFIG
  // --------------------------------------------------------------------------
  emCache(); // Cache for use mantine with tailwind

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    const theme = value || (colorScheme === 'dark' ? 'light' : 'dark');

    if (window) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    setColorScheme(theme);
  };

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        theme={{
          colorScheme,
          fontFamily: 'inherit',
          loader: 'bars',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
