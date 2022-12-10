import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import AppLayout from 'src/components/layouts/app';
import { GetServerSideProps } from 'next';
import {
  ICategoryHome,
  IHomeResponse,
  IProductHome,
  mountCategories,
  mountProduct,
  unmountProduct,
} from 'src/features/home';
import CategoryGroup from 'src/components/home/CategoryGroup';
import { useRouter } from 'next/router';
import ProductDrawer from 'src/components/home/ProductDrawer';
import { appSelector } from 'src/features/app';

export const getServerSideProps: GetServerSideProps = async () => {
  const api = process.env.NEXT_PUBLIC_API_URI;
  const categories: ICategoryHome[] = [];

  try {
    const categoryRes = await fetch(`${api}/home`);
    const { ok, categories: data }: IHomeResponse = await categoryRes.json();
    if (ok) {
      categories.push(
        ...data.filter(item => item.isEnabled && item.products.length > 0)
      );
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  return {
    props: {
      categories,
    },
  };
};

interface Props {
  categories: ICategoryHome[];
}

const defaultTitle = 'Home';

export default function Home({ categories }: Props) {
  const { description: appDescription } = useAppSelector(appSelector);
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState<string | undefined>(
    appDescription
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const findProduct = (slug: string | string[] | undefined) => {
    let product: IProductHome | undefined;

    if (typeof slug === 'string') {
      for (let index = 0; index < categories.length; index++) {
        const category = categories[index];
        product = category.products.find(product => product.slug === slug);
        if (product) break;
      }
    }

    return product;
  };

  useEffect(() => {
    dispatch(mountCategories(categories));
  }, [categories]);

  useEffect(() => {
    const product = findProduct(router.query.product);
    if (product) {
      setTitle(product.name);
      setDescription(product.description);
      dispatch(mountProduct(product));
    } else {
      setTitle(defaultTitle);
      setDescription(appDescription);
      dispatch(unmountProduct());
      router.push('/', undefined, { shallow: true });
    }
  }, [router.asPath]);

  return (
    <>
      <AppLayout title={title} description={description} sidebarLinks="foo">
        <div className="w-full md:mx-auto md:w-11/12 lg:max-w-5xl">
          {categories.map((category, index) => (
            <CategoryGroup
              key={category.id}
              category={category}
              imagePriority={index <= 1}
            />
          ))}
        </div>
      </AppLayout>
      <ProductDrawer />
    </>
  );
}
