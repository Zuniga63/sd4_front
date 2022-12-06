import React from 'react';
import { appSelector } from 'src/features/app';
import { useAppSelector } from 'src/store/hooks';
import Head from 'next/head';
import AppHeader from '../AppHeader';
import AppSidebar from '../AppSidebar';

interface Props {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const AppLayout = ({ title = 'App Layout', description, children }: Props) => {
  const { name: appName } = useAppSelector(appSelector);
  const fullTitle = appName ? `${title} - ${appName}` : title;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        {description ? <meta name="description" content={description} /> : null}
      </Head>

      <AppHeader />
      <main>{children}</main>
      <AppSidebar>Foo</AppSidebar>
    </>
  );
};

export default AppLayout;
