import { Drawer } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { appSelector, hideMenu } from 'src/features/app';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import BrandLogo from './BrandLogo';
import MenuToggle from './MenuToggle';

interface Props {
  children?: React.ReactNode;
}

const AppSidebar = ({ children }: Props) => {
  const { name: appName, menuOpened: opened } = useAppSelector(appSelector);
  const dispatch = useAppDispatch();
  const largeScreen = useMediaQuery('(min-width: 768px)');

  return (
    <Drawer
      opened={opened}
      onClose={() => dispatch(hideMenu())}
      padding={0}
      withCloseButton={false}
      size={largeScreen ? 'md' : '100%'}
    >
      <header className="sticky top-0 z-fixed bg-neutral-300 dark:bg-dark-header">
        <div className="flex h-16 items-center justify-between px-4 py-2">
          <BrandLogo />
          <h2 className="font-bold text-dark dark:text-light">{appName}</h2>
          <MenuToggle />
        </div>
      </header>
      <nav className="relative h-screen overflow-y-auto bg-light pb-40 dark:bg-defaul-body">
        {children}
      </nav>
    </Drawer>
  );
};

export default AppSidebar;
