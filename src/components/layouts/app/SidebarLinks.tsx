import { useWindowScroll } from '@mantine/hooks';
import Image from 'next/image';
import React from 'react';
import { hideMenu } from 'src/features/app';
import { homeSelector } from 'src/features/home';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

const SidebarLinks = () => {
  const { categories } = useAppSelector(homeSelector);
  const dispatch = useAppDispatch();
  const [scroll, scrollTo] = useWindowScroll();

  const goToCategory = (categoryId: string) => {
    const header = document.getElementById('home-header');
    const categoryGroup: HTMLElement | null = document.querySelector(
      `[data-id="${categoryId}"]`
    );

    if (header && categoryGroup) {
      const y = categoryGroup.offsetTop - header.offsetHeight;
      if (scroll.y !== y) {
        scrollTo({ y });
      }
    }

    dispatch(hideMenu());
  };

  return (
    <>
      <header>
        <h2 className="border-b-4 border-double border-gray-400 px-4 py-2 text-center font-hand text-3xl text-dark dark:text-light">
          Menú
        </h2>
      </header>
      <ul className="divide-y divide-gray-300 dark:divide-gray-700">
        {categories.map(category => (
          <li key={category.id} className="overflow-hidden">
            <button
              type="button"
              onClick={() => goToCategory(category.id)}
              className="block w-full"
            >
              <div className="flex items-start gap-3 text-dark dark:text-light">
                {category.image && (
                  <figure
                    className="relative block aspect-square w-24 shrink-0 overflow-hidden shadow-lg"
                    role="presentation"
                  >
                    <Image
                      src={category.image.url}
                      alt={category.name}
                      fill
                      sizes="56px"
                      className="object-cover object-center"
                    />
                  </figure>
                )}
                <div className="flex-grow py-2 pr-4 text-left">
                  <h3 className="font-hand text-2xl font-black">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="mt-2 line-clamp-2 text-left font-sans text-xs font-medium tracking-wider text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarLinks;
