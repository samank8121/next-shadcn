import { GetProductsType } from '@/shared/types/ProductType';
import ProductCard from './product-card';

const ProductList = ({ products }: { products: GetProductsType }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
      {products.products.map((p) => (
        <ProductCard key={p.slug} product={p} value={10}/>
      ))}
    </div>
  );
};

export default ProductList;
