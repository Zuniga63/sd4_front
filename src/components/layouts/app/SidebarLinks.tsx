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
        <h2 className="border-b-4 border-double border-gray-400 py-2 px-4 text-center font-hand text-3xl text-dark dark:text-light">
          Menú
        </h2>
      </header>
      <ul className="divide-y divide-gray-300 dark:divide-gray-700">
        {categories.map(category => (
          <li key={category.id}>
            <button
              type="button"
              onClick={() => goToCategory(category.id)}
              className="block w-full"
            >
              <div className="flex items-center gap-3 p-4 text-dark dark:text-light">
                {category.image && (
                  <figure
                    className="relative block aspect-square w-14 shrink-0 overflow-hidden rounded-full shadow-lg shadow-blue-500 ring-4 ring-blue-400 dark:shadow-yellow-500 dark:ring-yellow-400"
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
                <div className="flex-grow">
                  <h3 className="font-hand text-xl font-black">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="mt-2 font-sans text-xs font-medium tracking-wider text-gray-600 line-clamp-2 dark:text-gray-400">
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
