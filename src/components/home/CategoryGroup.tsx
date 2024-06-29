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
    <section data-id={category.id} className="relative">
      <header className="sticky top-16 z-50">
        <div className="flex min-h-24 items-start gap-x-3 bg-gray-200 bg-opacity-20 shadow backdrop-blur dark:bg-gray-dark dark:bg-opacity-50 dark:text-gray-100">
          {image && (
            <figure
              className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-r-full"
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
          <div className="py-1">
            <h3 className="font-hand text-2xl font-black">{category.name}</h3>
            {category.description && (
              <p className="line-clamp-3 text-xs tracking-wider">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </header>
      <div className="grid bg-gray-800 bg-opacity-20 md:grid-cols-2 md:gap-4 md:px-4 md:py-2 xl:grid-cols-3">
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
