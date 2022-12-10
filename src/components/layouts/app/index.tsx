import React from 'react';
import { appSelector } from 'src/features/app';
import { useAppSelector } from 'src/store/hooks';
import Head from 'next/head';
import AppHeader from '../AppHeader';
import AppSidebar from '../AppSidebar';
import { Affix, Button, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons';
import SidebarLinks from './SidebarLinks';

interface Props {
  title?: string;
  description?: string;
  sidebarLinks?: React.ReactNode;
  children?: React.ReactNode;
}

const AppLayout = ({
  title = 'App Layout',
  description,
  sidebarLinks,
  children,
}: Props) => {
  const { name: appName } = useAppSelector(appSelector);
  const fullTitle = appName ? `${title} - ${appName}` : title;
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        {description ? <meta name="description" content={description} /> : null}
      </Head>

      <AppHeader />
      <main>{children}</main>

      <AppSidebar>
        <SidebarLinks />
      </AppSidebar>

      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {transitionStyles => (
            <Button
              leftIcon={<IconArrowUp size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
              radius="xl"
            >
              Ir arriba
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
};

export default AppLayout;
