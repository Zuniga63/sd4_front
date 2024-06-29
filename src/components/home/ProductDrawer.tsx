import { Drawer } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconArrowBadgeLeft,
  IconArrowBadgeRight,
  IconX,
} from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  homeSelector,
  IImage,
  IProductHome,
  IProductOptionSetHome,
  mountProduct,
} from 'src/features/home';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import currencyFormat from 'src/utils/currency-format';
import ProductOptionSetCard from './ProductOptionSetCard';

const ProductDrawer = () => {
  //-------------------------------------------------------
  // STORE and HOOKS
  //-------------------------------------------------------
  const { categories, product, category } = useAppSelector(homeSelector);
  const largeScreen = useMediaQuery('(min-width: 768px)');
  const router = useRouter();
  const dispatch = useAppDispatch();

  //-------------------------------------------------------
  // STATE
  //-------------------------------------------------------
  const [opened, setOpened] = useState(false);
  const [image, setImage] = useState<IImage | undefined>(product?.image);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [base, setBase] = useState(0);
  const [optionSets, setOptionSets] = useState<IProductOptionSetHome[]>([]);

  //-------------------------------------------------------
  // NAVIGATE
  //-------------------------------------------------------
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(true);

  const goToProduct = (product?: IProductHome) => {
    if (product) {
      dispatch(mountProduct(product));
    }
  };

  const next = () => {
    if (product && categories && category) {
      let nextProduct: IProductHome | undefined;
      const productIndex = category.products.findIndex(
        item => item.id === product.id
      );

      const categoryIndex = categories.findIndex(
        item => item.id === category.id
      );

      if (productIndex < category.products.length - 1) {
        nextProduct = category.products[productIndex + 1];
      } else if (categoryIndex < categories.length - 1) {
        const nexCategory = categories[categoryIndex + 1];
        if (nexCategory.products.length > 0) {
          nextProduct = nexCategory.products[0];
        }
      }

      goToProduct(nextProduct);
    }
  };

  const prev = () => {
    if (product && categories && category) {
      let prevProduct: IProductHome | undefined;

      const productIndex = category.products.findIndex(
        item => item.id === product.id
      );

      const categoryIndex = categories.findIndex(
        item => item.id === category.id
      );

      if (productIndex > 0) {
        prevProduct = category.products[productIndex - 1];
      } else if (categoryIndex > 0) {
        const prevCategory = categories[categoryIndex - 1];
        if (prevCategory.products.length > 0) {
          prevProduct = prevCategory.products.at(-1);
        }
      }

      goToProduct(prevProduct);
    }
  };

  //-------------------------------------------------------
  // METHODS
  //-------------------------------------------------------

  const close = () => {
    setOpened(false);
    setTimeout(() => {
      router.push('/', undefined, { shallow: true });
    }, 250);
  };

  useEffect(() => {
    let openDrawer = false;
    let isFirst = true;
    let isLast = true;

    if (product) {
      openDrawer = true;
      // Set Image
      setImage(product.image);

      // Set Discount
      if (product.hasDiscount && product.price && product.priceWithDiscount) {
        const fraction = 1 - product.priceWithDiscount / product.price;
        const percentage = fraction * 100;
        setDiscountPercentage(Math.round(percentage));
        setBase(product.priceWithDiscount);
        setHasDiscount(true);
      } else {
        setDiscountPercentage(0);
        setHasDiscount(false);
        if (product?.price) setBase(product.price);
      }

      // Se optimizan los sets de opciones
      if (product.optionSets && product.optionSets.length) {
        const setList = product.optionSets.map(optionSet => {
          const items = optionSet.items.slice().sort((a, b) => {
            if (a.order > b.order) return 1;
            if (a.order < b.order) return -1;
            return 0;
          });

          return { ...optionSet, items };
        });

        setOptionSets(setList);
      } else {
        setOptionSets([]);
      }

      // Set position
      if (categories.length > 0 && category) {
        const categoryIndex = categories.findIndex(
          item => item.id === category.id
        );

        const productIndex = category.products.findIndex(
          item => item.id === product.id
        );

        isFirst = categoryIndex <= 0 && productIndex <= 0;

        isLast =
          categoryIndex >= categories.length - 1 &&
          productIndex >= category.products.length - 1;
      }
    }

    setOpened(openDrawer);
    setIsFirst(isFirst);
    setIsLast(isLast);
  }, [product]);

  if (!product) return null;

  return (
    <Drawer
      opened={opened}
      onClose={close}
      padding={0}
      size={largeScreen ? 'xl' : '100%'}
      withCloseButton={false}
      position="right"
    >
      <div className="relative h-screen overflow-y-auto">
        <header className="sticky top-0 z-fixed flex items-center justify-between gap-x-4 bg-dark px-4 py-6 text-light">
          <div className="flex-grow">
            <h2 className="flex-grow text-center font-display text-base tracking-widest sm:text-lg">
              {product?.name}
            </h2>
            <p className="text-center text-xs font-bold tracking-wider">
              {category?.name}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="flex-grow-0 focus:outline-none"
          >
            <IconX size={25} stroke={3} />
          </button>
        </header>

        <div className="bg-gradient-to-b from-dark to-gray-600 pb-[50vh]">
          {/* PRODUCT IMAGE */}
          {image ? (
            <figure className="relative mb-8 block">
              <Image
                src={image.url}
                alt={product?.name || 'Product'}
                width={image.width}
                height={image.height}
                loading="lazy"
              />
            </figure>
          ) : null}

          {/* PRODUCT INFO */}
          <div className="px-6 py-8">
            {/* DESCRIPTION */}
            {product?.description ? (
              <p className="mb-4 text-lg text-light">{product?.description}</p>
            ) : null}

            {/* Price and Discount */}
            <div className="flex flex-col items-end">
              {/* PRICE */}
              <p className="font-bold tracking-widest text-light">
                {hasDiscount ? <span className="text-sm">antes </span> : null}
                <span
                  className={
                    hasDiscount
                      ? 'text-sm text-gray-400 line-through'
                      : 'text-xl'
                  }
                >
                  {currencyFormat(product?.price)}
                </span>
              </p>

              {/* DISCOUNT */}
              {hasDiscount ? (
                <p className="text-xl font-bold tracking-widest text-light">
                  {currencyFormat(product?.priceWithDiscount)}{' '}
                  <span className="text-sm text-green-500">
                    ({discountPercentage} %)
                  </span>
                </p>
              ) : null}
            </div>
          </div>

          {optionSets.map(optionSet => (
            <ProductOptionSetCard
              product={product}
              optionSet={optionSet}
              base={base}
              hasDiscount={hasDiscount}
              key={optionSet.id}
            />
          ))}
        </div>

        {/* PREV */}
        {!isFirst ? (
          <button
            className="fixed left-0 top-1/2 rounded-r-lg bg-white bg-opacity-10 px-4 py-8 text-dark text-opacity-70 transition-colors active:bg-white active:bg-opacity-90 lg:hover:bg-opacity-90"
            onClick={prev}
          >
            <IconArrowBadgeLeft size={28} />
          </button>
        ) : null}

        {/* NEXT */}
        {!isLast ? (
          <button
            className="fixed right-0 top-1/2 z-fixed rounded-l-lg bg-white bg-opacity-10 px-4 py-8 text-dark text-opacity-70 transition-colors active:bg-white active:bg-opacity-90 lg:hover:bg-opacity-90"
            onClick={next}
          >
            <IconArrowBadgeRight size={28} />
          </button>
        ) : null}
      </div>
    </Drawer>
  );
};

export default ProductDrawer;
