'use client';
import { ProductType } from '@/shared/types/ProductType';
import Link from 'next/link';
import Image from 'next/image';
import { euro } from '@/shared/constant';
import { Star } from 'lucide-react';
import clsx from 'clsx';
import IncreaseDecrease from '@/components/public/increase-decrease/increase-decrease';
import { FC } from 'react';

type ProductCardProp = {
  product: ProductType;
  value: number;
};
const ProductCard: FC<ProductCardProp> = ({
  product: { caption, imageSrc, rate, price, weight, slug },
  value,
}) => {
  const onChangeProduct = () => {
    console.log('onChangeProduct');
  };
  return (
    <div className='flex flex-col justify-start shadow-md rounded-md overflow-hidden border-[1px] border-gray-100'>
      <Link
        className='flex relative w-full h-[175px] items-center justify-center cursor-pointer'
        href={`products/${slug}`}
      >
        <Image
          src={imageSrc}
          alt={caption}
          fill
          loading='lazy'
          style={{ objectFit: 'cover', margin: 'auto' }}
          draggable={false}
          onDragStart={(event) => {
            event.preventDefault();
          }}
        />
      </Link>
      <div className='p-2'>
        {price !== 0 ? (
          <IncreaseDecrease
            className='mb-2'
            value={value}
            addBtnText='Add'
            onChange={onChangeProduct}
          />
        ) : (
          <div />
        )}
        <div
          className={clsx('flex flex-row gap-2', {
            hidden: rate === 0,
          })}
        >
          <Star className='fill-yellow-500 stroke-yellow-500' />
          <span className='font-semibold'>{rate}</span>
        </div>
        <span className='font-medium text-lg'>{caption}</span>
        <div className='flex flex-row gap-2'>
          <span
            className={clsx('font-medium', { 'text-red-500': price === 0 })}
          >
            {price === 0 ? 'Out of Stock' : price}
          </span>
          {price !== 0 && <span className='font-medium'>{euro}</span>}
        </div>

        {weight && <div className='text-sm'>{weight}</div>}
      </div>
    </div>
  );
};

export default ProductCard;
