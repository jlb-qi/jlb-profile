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
        edges: Array<{
          node: {
            url: string;
          };
        }>;
      };
    };
  };
}

interface CartProps {
  items: CartItem[];
  checkoutUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = ({ items, checkoutUrl, isOpen, onClose }: CartProps) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => {
    return sum + parseFloat(item.merchandise.priceV2.amount) * item.quantity;
  }, 0);

  const getResizedImageUrl = (url: string) => {
    return url.replace(/\.(jpg|jpeg|png|gif)\?v=/, '_60x60.$1?v=');
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-6 transform transition-transform">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {items.length} products - {total} kr
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-4 mb-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        {items.map((item) => {
          const imageUrl = item.merchandise.product.images.edges[0]?.node.url;
          const resizedImageUrl = imageUrl ? getResizedImageUrl(imageUrl) : '';

          return (
            <div key={item.id} className="flex items-center space-x-4">
              <img
                src={resizedImageUrl}
                alt={item.merchandise.product.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.merchandise.product.title}</h3>
                <p className="text-gray-600">
                  {item.merchandise.priceV2.amount} {item.merchandise.priceV2.currencyCode}
                </p>
              </div>
              <span className="text-gray-500">×{item.quantity}</span>
            </div>
          );
        })}
      </div>

      <a
        href={checkoutUrl}
        className="block w-full bg-blue-900 text-white text-center py-3 rounded hover:bg-blue-800 transition-colors"
      >
        Checkout
      </a>
    </div>
  );
};
