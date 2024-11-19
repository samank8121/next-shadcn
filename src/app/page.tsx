import { cache } from 'react'
import ProductList from '@/components/private/product/product-list';
import { GET_PRODUCTS } from '@/shared/graphql/products';
import { GetProductsType } from '@/shared/types/ProductType';
import request from 'graphql-request';

const getProducts = cache(async () => {
  return await request<GetProductsType>(
    process.env.NEXT_PUBLIC_API_ADDRESS ?? '',
    GET_PRODUCTS
  );
});

export default async function Home() {
  const result = await getProducts();

  return (
    <div className='font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col w-full p-10'>
        <ProductList products={result} />
      </main>
    </div>
  );
}