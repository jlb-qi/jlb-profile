import { useState } from 'react';
import type { ShopifyProduct } from '../types/shopify';

interface ProductCardProps {
  product: ShopifyProduct;
  onAddToCart: (variantId: string) => Promise<void>;
  cartId: string;
  imageSize?: number;
}

export const ProductCard = ({ product, onAddToCart, imageSize = 160 }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // Get available options from the product
  const options = product.options || [];
  const variants = product.variants.edges;

  // Find a variant that matches specific options (used for finding color variants)
  const findVariantByOptions = (optionsToMatch: string[]) => {
    if (!variants.length) return null;
    
    return variants.find(({ node }) => 
      node.selectedOptions.every(
        option => 
          // Only match the options we care about
          !optionsToMatch.includes(option.name) || 
          selectedOptions[option.name] === option.value
      )
    )?.node || null;
  };

  // Find the selected variant based on all current options (used for add to cart)
  const findSelectedVariant = () => {
    if (!variants.length) return null;
    
    // If no options are selected yet, return null
    const selectedOptionCount = Object.keys(selectedOptions).length;
    if (selectedOptionCount === 0) return null;
    
    // Find a variant that matches all selected options
    return variants.find(({ node }) => 
      node.selectedOptions.every(
        option => selectedOptions[option.name] === option.value
      )
    )?.node || null;
  };

  // Get the current image URL based on the selected color variant
  const getCurrentImageUrl = () => {
    // Find a variant that matches just the color option
    const colorVariant = findVariantByOptions(['Color']);
    const variantImageUrl = colorVariant?.image?.url;
    const defaultImageUrl = product.images.edges[0]?.node.url;
    const originalImageUrl = variantImageUrl || defaultImageUrl;

    return originalImageUrl 
      ? originalImageUrl.replace(/\.(jpg|jpeg|png|gif)\?v=/, `_${imageSize}x${imageSize}.$1?v=`) 
      : '';
  };

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };

  const handleAddToCart = async () => {
    const selectedVariant = findSelectedVariant();
    if (!selectedVariant) return;

    setIsLoading(true);
    try {
      await onAddToCart(selectedVariant.id);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currency = product.priceRange.minVariantPrice.currencyCode;
  const selectedVariant = findSelectedVariant();
  const currentImageUrl = getCurrentImageUrl();
  const colorVariant = findVariantByOptions(['Color']);

  return (
    <div className="flex flex-col border border-[#eaeaea] bg-white h-full rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image Section */}
      <div className="border-b border-[#eaeaea] aspect-square">
        {currentImageUrl && (
          <img
            src={currentImageUrl}
            alt={colorVariant?.image?.altText || product.title}
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

          {/* Option Selections */}
          {options.map(option => (
            <div key={option.name} className="flex justify-between px-4 py-2">
              <span className="text-sm font-mono text-[#666666] w-[50%] shrink-0">{option.name}</span>
              {option.name.toLowerCase() === 'color' ? (
                <div className="flex gap-2 justify-end w-[50%]">
                  {option.values.map(value => (
                    <button
                      key={value}
                      onClick={() => handleOptionChange(option.name, value)}
                      className={`w-6 h-6 rounded border ${
                        selectedOptions[option.name] === value 
                          ? 'ring-2 ring-blue-500' 
                          : 'ring-1 ring-[#eaeaea]'
                      }`}
                      style={{ backgroundColor: value.toLowerCase() }}
                      title={value}
                    />
                  ))}
                </div>
              ) : (
                <select
                  value={selectedOptions[option.name] || ''}
                  onChange={(e) => handleOptionChange(option.name, e.target.value)}
                  className="text-sm font-mono text-[#666666] w-[50%] bg-transparent border border-[#eaeaea] rounded px-2"
                >
                  <option value="">Select {option.name}</option>
                  {option.values.map(value => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}

          <div className="flex justify-between items-center px-4 py-2">
            <span className="text-sm font-mono text-[#666666] w-[50%] shrink-0">Price</span>
            <span className="text-sm font-mono text-[#666666] w-[50%] text-right">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency,
              }).format(price)}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-auto p-4">
          <button
            onClick={handleAddToCart}
            disabled={isLoading || !selectedVariant}
            className={`w-full py-2 px-4 rounded font-mono text-sm ${
              isLoading || !selectedVariant
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};
