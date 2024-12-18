import { useState, useEffect } from 'react';
import { queryProducts, createCart, addToCart } from '../utils/shopifyClient';
import { ProductCard } from '../components/ProductCard';
import { Cart } from '../components/Cart';

interface ShopifyImage {
  node: {
    url: string;
    altText?: string;
  };
}

interface ShopifyProduct {
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
    edges: ShopifyImage[];
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
      };
    }>;
  };
}

interface CartItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    priceV2: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
      images: {
        edges: ShopifyImage[];
      };
    };
  };
}

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
    <div className="max-w-[800px] mx-auto">
      <div>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => handleAddToCart(product.variants.edges[0].node.id)}
            cartId={cartId}
            imageSize={160}
          />
        ))}
      </div>

      <Cart
        items={cartItems}
        checkoutUrl={checkoutUrl}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};
