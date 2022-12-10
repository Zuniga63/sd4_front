import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { appSelector } from 'src/features/app';
import { useAppSelector } from 'src/store/hooks';

const BrandLogo = () => {
  const { brandLogo, name } = useAppSelector(appSelector);

  return (
    <Link href="/">
      <figure className="relative aspect-square h-12">
        {brandLogo ? (
          <Image
            src={brandLogo}
            alt={`${name} - Logo`}
            fill
            className="object-contain"
            sizes="48px"
          />
        ) : null}
      </figure>
    </Link>
  );
};

export default BrandLogo;
