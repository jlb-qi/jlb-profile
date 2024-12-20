import { useState, useEffect } from 'react';
import { queryProducts, createCart, addToCart } from '../utils/shopifyClient';
import { ProductGrid } from '../components/ProductGrid';
import { Cart } from '../components/Cart';
import type { ShopifyProduct, CartItem } from '../types/shopify';

export const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [cartId, setCartId] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeShop = async () => {
      try {
        setLoading(true);
        setError(null);

        // Create a new cart
        const cartResponse = await createCart();
        setCartId(cartResponse.cartCreate.cart.id);
        setCheckoutUrl(cartResponse.cartCreate.cart.checkoutUrl);

        // Fetch products
        const productsResponse = await queryProducts();
        setProducts(productsResponse.products.edges.map(edge => edge.node));
      } catch (err) {
        console.error('Error initializing shop:', err);
        setError('Failed to load shop data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    initializeShop();
  }, []);

  const handleAddToCart = async (variantId: string) => {
    try {
      setError(null);
      const response = await addToCart({ cartId, variantId });
      const newCartItems = response.cartLinesAdd.cart.lines.edges.map(edge => edge.node);
      setCartItems(newCartItems);
      setIsCartOpen(true);
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Failed to add item to cart. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-sm font-mono text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-sm font-mono text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8">
      <ProductGrid
        products={products}
        onAddToCart={handleAddToCart}
        cartId={cartId}
      />

      <Cart
        items={cartItems}
        checkoutUrl={checkoutUrl}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};
