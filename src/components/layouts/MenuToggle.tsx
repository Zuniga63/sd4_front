import { Burger } from '@mantine/core';
import React from 'react';
import { appSelector, showMenu, hideMenu } from 'src/features/app';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

const MenuToggle = () => {
  const { menuOpened: opened } = useAppSelector(appSelector);
  const title = opened ? 'Close navigation' : 'Open navigation';

  const dispatch = useAppDispatch();

  const onClick = () => {
    if (opened) dispatch(hideMenu());
    else dispatch(showMenu());
  };

  return <Burger opened={opened} title={title} onClick={onClick} />;
};

export default MenuToggle;
