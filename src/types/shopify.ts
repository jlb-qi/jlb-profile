export interface ShopifyImage {
  node: {
    url: string;
    altText?: string;
  };
}

export interface ShopifyProduct {
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

export interface CartItem {
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
