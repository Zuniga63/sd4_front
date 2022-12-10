import Image from 'next/image';
import React from 'react';
import { IProductHome, IProductOptionSetHome } from 'src/features/home';
import currencyFormat from 'src/utils/currency-format';

interface Props {
  optionSet: IProductOptionSetHome;
  product: IProductHome;
  base: number;
  hasDiscount: boolean;
}

const ProductOptionSetCard = ({
  optionSet,
  product,
  base,
  hasDiscount,
}: Props) => {
  return (
    <div className="w-full px-6 pb-4">
      <div className="rounded shadow">
        <header className="rounded-t bg-dark px-6 py-4">
          <h3 className="text-xl font-bold tracking-wider text-yellow-400">
            {optionSet.title}
          </h3>
        </header>
        <ul className="divide-y divide-slate-400 rounded-b border-x border-b border-dark bg-gradient-to-br from-slate-900 to-slate-400 py-6 px-2">
          {optionSet.items.map(
            item =>
              item.published &&
              item.optionSetItem.isEnabled && (
                <li key={item.id} className="block px-4 py-2 tracking-wider">
                  <div className="flex items-center gap-x-3">
                    <figure className="block h-16 w-16 flex-shrink-0 flex-grow-0 overflow-hidden rounded-full shadow shadow-yellow-400">
                      {item.optionSetItem.image && (
                        <Image
                          alt="Option set"
                          src={item.optionSetItem.image.url}
                          width={item.optionSetItem.image.width}
                          height={item.optionSetItem.image.height}
                          loading="lazy"
                        />
                      )}
                    </figure>
                    <div className="flex-grow">
                      <p className="font-display text-sm text-yellow-400">
                        {item.optionSetItem.name}
                      </p>

                      {hasDiscount && (
                        <p className="mb-1 text-xs text-gray-200">
                          antes{' '}
                          <span className="text-light text-opacity-50 line-through">
                            {currencyFormat(
                              (product?.price || 0) + (item.price || 0)
                            )}
                          </span>
                        </p>
                      )}
                      <p className="text-sm font-bold text-light">
                        {currencyFormat(base + (item.price || 0))}
                      </p>
                    </div>
                  </div>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductOptionSetCard;
