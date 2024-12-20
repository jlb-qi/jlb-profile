import { ProductCard } from './ProductCard';
import type { ShopifyProduct } from '../types/shopify';

interface ProductGridProps {
  products: ShopifyProduct[];
  onAddToCart: (variantId: string) => Promise<void>;
  cartId: string;
}

export const ProductGrid = ({ products, onAddToCart, cartId }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {products.map((product) => (
        <div key={product.id} className="w-full">
          <ProductCard
            product={product}
            onAddToCart={() => onAddToCart(product.variants.edges[0].node.id)}
            cartId={cartId}
            imageSize={300}
          />
        </div>
      ))}
    </div>
  );
};
