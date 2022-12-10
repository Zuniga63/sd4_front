import { IconList } from '@tabler/icons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { IProductHome, mountProduct } from 'src/features/home';
import { useAppDispatch } from 'src/store/hooks';
// import { useAppDispatch } from 'src/store/hooks';
import currencyFormat from 'src/utils/currency-format';

interface Props {
  product: IProductHome;
  imagePriority?: boolean;
}

const ProductCard = ({ product, imagePriority }: Props) => {
  const { image, price, hasDiscount, priceWithDiscount } = product;
  const router = useRouter();

  //---------------------------------------------------------------------------
  // STATE
  //---------------------------------------------------------------------------
  const [percentage, setPercentage] = useState('');
  const [hasVariablePrice, setHasVariablePrice] = useState(false);
  const [hasOptions, setHasOptions] = useState(false);

  //---------------------------------------------------------------------------
  // METHODS
  //---------------------------------------------------------------------------
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasDiscount && price && priceWithDiscount) {
      const fraction = Math.round((1 - priceWithDiscount / price) * 100);
      setPercentage(`${fraction}% DCT`);
    }

    if (product.optionSets && product.optionSets.length) {
      let variablePrice = false;
      setHasOptions(true);
      product.optionSets.forEach(optionSet => {
        const optionSetHasVariablePrice = optionSet.items.some(
          item => item.price
        );
        variablePrice = variablePrice || optionSetHasVariablePrice;
      });

      setHasVariablePrice(variablePrice);
    }
  }, []);

  const clickHandler = () => {
    // const url = `/products/${product.id}/add-view`;
    // dispatch(showProduct(product));
    // axios.put(url);
    dispatch(mountProduct(product));
    setTimeout(() => {
      router.push(
        { pathname: '/', query: { product: product.slug } },
        undefined,
        { shallow: true }
      );
    }, 250);
  };

  return (
    <div
      className="product relative grid grid-cols-auto-fr gap-3 border-b bg-light pt-8 pb-4 pr-4 pl-4 dark:border-yellow-500 dark:bg-dark-header md:rounded md:border-none md:shadow md:shadow-blue-500 dark:md:shadow-amber-400"
      key={product.id}
      onClick={clickHandler}
      role="presentation"
    >
      {image && (
        <figure className="product__fig relative z-0 m-0 h-24 w-24 overflow-hidden rounded-lg shadow-md shadow-neutral-800 dark:shadow dark:shadow-amber-400">
          <Image
            src={image.url}
            alt={product.name}
            width={image.width}
            height={image.height}
            className="h-full w-full border-none bg-transparent object-cover object-center"
            loading="lazy"
          />
        </figure>
      )}

      <div className={`${image ? '' : 'col-span-2'} text-dark dark:text-light`}>
        <h4 className="mb-1 border-b-4 border-double border-gray-dark pb-1 font-display text-sm font-normal tracking-wider dark:border-light">
          {product.name}
        </h4>
        {product.description && (
          <p className="product__description w-full text-sm leading-normal line-clamp-2">
            {product.description}
          </p>
        )}
        <p className="mt-2 font-black tracking-widest text-dark dark:text-light">
          <span
            className={
              percentage &&
              ' inline-block text-xs text-gray-dark text-opacity-50 line-through dark:text-light'
            }
          >
            {currencyFormat(price)}
          </span>
        </p>
        {percentage && (
          <p className="flex gap-2 font-black tracking-widest text-dark dark:text-light">
            <span className="text-sm font-bold">
              {currencyFormat(priceWithDiscount)}
            </span>
            <span className=" scale-75 text-xs text-green-600">
              ({percentage})
            </span>
          </p>
        )}
      </div>

      {hasOptions && (
        <>
          {hasVariablePrice && (
            <p className="col-span-2 text-xs text-gray-dark dark:text-light">
              * El precio de este producto puede variar segun la opción elegida.
            </p>
          )}
          <div className="col-span-2">
            <div className="flex justify-start">
              <div className="shadow-new-tag relative -left-4 scale-75 transform rounded border border-green-900 bg-green-800 p-1 text-xs font-black tracking-widest text-light">
                <IconList size={16} className="inline-block" /> Tiene opciones.{' '}
              </div>
            </div>
          </div>
        </>
      )}
      {product.productIsNew && (
        <div className="shadow-new-tag absolute top-2 right-2 scale-75 transform rounded border border-red-700 bg-red-600 p-1 text-xs font-black tracking-widest text-light">
          New
        </div>
      )}
    </div>
  );
};

export default ProductCard;
