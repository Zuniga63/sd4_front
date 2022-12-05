import { Button, TextInput, useMantineColorScheme } from '@mantine/core';
import Head from 'next/head';

export default function Home() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <div>
      <Head>
        <title>My Bar</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2 className="text-red-500">Hello World {colorScheme}</h2>
      <Button onClick={() => toggleColorScheme()}>Go to </Button>
      <TextInput />
    </div>
  );
}