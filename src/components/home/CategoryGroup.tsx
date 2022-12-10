import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ICategoryHome, IProductHome } from 'src/features/home';
import ProductCard from './ProductCard';

interface Props {
  category: ICategoryHome;
  imagePriority?: boolean;
}

const CategoryGroup = ({ category, imagePriority = false }: Props) => {
  const { image, products } = category;
  const [productList, setProductList] = useState<IProductHome[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const list = products.filter(p => p.published);
    if (list.length > 0) {
      setShow(true);
      setProductList(list);
    }
  }, []);

  if (!show) return null;

  return (
    <section /* id={createSlug(category.name)} */ data-id={category.id}>
      <header className="flex items-start gap-3 bg-gray-200 p-4 dark:bg-gray-dark dark:text-gray-100">
        {image && (
          <figure
            className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-blue-500 dark:ring-amber-400"
            /* onClick={() => imageClickHandler(image)} */
            role="presentation"
          >
            <Image
              src={image.url}
              alt={category.name}
              width={image.width}
              height={image.height}
              loading="lazy"
            />
          </figure>
        )}
        <div>
          <h3 className="font-hand text-3xl font-black">{category.name}</h3>
          {category.description && (
            <p className="mt-2 text-sm font-medium tracking-wider">
              {' '}
              {category.description}{' '}
            </p>
          )}
        </div>
      </header>
      <div className="grid bg-gray-800 bg-opacity-20 backdrop-blur md:grid-cols-2 md:gap-4 md:px-4 md:py-2 xl:grid-cols-3">
        {productList.map((item, index) => (
          <ProductCard
            product={item}
            imagePriority={index <= 3}
            key={item.id}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryGroup;
