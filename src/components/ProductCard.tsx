import { useState } from 'react';
import type { ShopifyProduct } from '../types/shopify';

interface ProductCardProps {
  product: ShopifyProduct;
  onAddToCart: () => Promise<void>;
  cartId: string;
  imageSize?: number;
}

export const ProductCard = ({ product, onAddToCart, imageSize = 160 }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await onAddToCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const originalImageUrl = product.images.edges[0]?.node.url;
  const imageUrl = originalImageUrl ? originalImageUrl.replace(/\.(jpg|jpeg|png|gif)\?v=/, `_${imageSize}x${imageSize}.$1?v=`) : '';
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currency = product.priceRange.minVariantPrice.currencyCode;

  return (
    <div className="flex flex-col border border-[#eaeaea] bg-white h-full rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image Section */}
      <div className="border-b border-[#eaeaea] aspect-square">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Details Section */}
      <div className="flex flex-col flex-1">
        <div className="divide-y divide-[#eaeaea]">
          <div className="flex justify-between px-4 py-2">
            <span className="text-sm font-mono text-[#666666] w-[50%] shrink-0">Product</span>
            <span className="text-sm font-mono text-[#666666] w-[50%] break-words text-right">{product.title}</span>
          </div>

          <div className="flex justify-between items-center px-4 py-2">
            <span className="text-sm font-mono text-[#666666]">Price</span>
            <span className="text-sm font-mono text-[#666666] text-right">
              {price} {currency}
            </span>
          </div>

          <div className="flex justify-between items-center px-4 py-2">
            <span className="text-sm font-mono text-[#666666]">ID</span>
            <span className="text-sm font-mono text-[#666666] text-right">({product.id.split('/').pop()?.slice(-2)})</span>
          </div>

          <div className="flex justify-between items-center px-4 py-2">
            <span className="text-sm font-mono text-[#666666]">Status</span>
            <span className="text-sm font-mono text-[#666666] text-right">Available</span>
          </div>
        </div>

        <div className="px-4 py-2 border-t border-[#eaeaea]">
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="w-full bg-black text-white px-4 py-2 hover:bg-gray-900 transition-colors disabled:opacity-50 text-sm font-mono"
          >
            {isLoading ? 'Adding...' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
};
