import { useState } from 'react';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    description: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText?: string;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
        };
      }>;
    };
  };
  onAddToCart: () => void;
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
    <div className="flex border border-[#eaeaea] bg-white">
      {/* Image Section */}
      <div className="border-r border-[#eaeaea]">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Details Section */}
      <div className="flex-1">
        <div className="divide-y divide-[#eaeaea]">
          <div className="flex justify-between items-center px-6 py-4">
            <span className="text-sm font-mono text-[#666666]">Product</span>
            <span className="text-sm font-light">{product.title}</span>
          </div>

          <div className="flex justify-between items-center px-6 py-4">
            <span className="text-sm font-mono text-[#666666]">Price</span>
            <span className="text-sm font-light">
              {price} {currency}
            </span>
          </div>

          <div className="flex justify-between items-center px-6 py-4">
            <span className="text-sm font-mono text-[#666666]">ID</span>
            <span className="text-sm font-mono text-[#666666]">({product.id.split('/').pop()?.slice(-2)})</span>
          </div>

          <div className="flex justify-between items-center px-6 py-4">
            <span className="text-sm font-mono text-[#666666]">Status</span>
            <span className="text-sm font-light">Available</span>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[#eaeaea]">
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
