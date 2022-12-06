import { Avatar } from '@mantine/core';
import React from 'react';
import { appSelector } from 'src/features/app';
import { useAppSelector } from 'src/store/hooks';
import BrandLogo from './BrandLogo';
import DarkButtom from './DarkButton';
import MenuToggle from './MenuToggle';

const AppHeader = () => {
  const app = useAppSelector(appSelector);

  return (
    <header className="flex h-16 items-center justify-between bg-gray-300 px-4 dark:bg-dark-header lg:px-8">
      <div className="flex items-center lg:gap-x-4">
        <div className="hidden lg:block">
          <MenuToggle />
        </div>
        <BrandLogo />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold text-dark dark:text-light">
          {app.name}
        </h2>
        {app.slogan ? (
          <p className="text-xs line-clamp-1">{app.slogan}</p>
        ) : null}
      </div>
      <div className="flex items-center gap-x-2 lg:gap-x-4">
        <DarkButtom />
        <div className="lg:hidden">
          <MenuToggle />
        </div>
        <div className="hidden lg:block">
          <Avatar radius="xl" color="blue" size="md" />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
