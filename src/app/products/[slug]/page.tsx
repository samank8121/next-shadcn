import { GET_PRODUCTS } from '@/shared/graphql/products';
import { GetProductsType, ProductType } from '@/shared/types/ProductType';
import request from 'graphql-request';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';
import { Star } from 'lucide-react';
import { euro } from '@/shared/constant';
import ProductChart from '@/components/private/product/product-chart';

const getProduct = async (slug: string): Promise<ProductType | undefined> => {
  const res = await request<GetProductsType>(
    process.env.NEXT_PUBLIC_API_ADDRESS!,
    GET_PRODUCTS,
    {
      slug: slug,
    }
  );
  if (!res) return undefined;
  return res.products[0];
};

export default async function Product({
  params,
}: {
  params: { slug: string };
}) {
  const p = await params;
  const product = await getProduct(p.slug);

  if (!product) {
    notFound();
  }
  const { caption, imageSrc, rate, price, weight, description } = product;
  return (
    <div className='p-3 flex flex-col gap-4'>
      <div className='flex flex-col lg:flex-row gap-4'>
        <div className='relative min-w-full h-screen-w sm:h-[500px] aspect-w-1 aspect-h-1 sm:min-w-[500px] max-w-[500px] cursor-pointer rounded-xl overflow-hidden'>
          <Image
            src={imageSrc}
            alt={caption}
            fill
            loading='lazy'
            style={{ objectFit: 'cover', margin: 'auto' }}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <span className='font-medium text-lg'>{caption}</span>
          <div className='flex flex-row gap-2 items-center'>
            <div
              className={clsx('flex flex-row gap-2', {
                hidden: rate === 0,
              })}
            >
              <Star className='fill-yellow-500 stroke-yellow-500' />
              <span className='font-semibold'>{rate}</span>
            </div>
            <span className='font-medium text-lg'>|</span>
            <div className='flex flex-row gap-2'>
              <span
                className={clsx('font-medium', { 'text-red-500': price === 0 })}
              >
                {price === 0 ? 'Out of Stock' : price}
              </span>
              {price !== 0 && <span className='font-medium'>{euro}</span>}
            </div>
            <span className='font-medium text-lg'>|</span>
            {weight && <div className='text-sm'>{weight}</div>}
          </div>

          {description && (
            <div
              className='text-lg'
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
      </div>
      <ProductChart />
    </div>
  );
}
