export interface ShopifyImage {
  node: {
    url: string;
    altText?: string;
  };
}

export interface ShopifyVariant {
  node: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    image?: {
      url: string;
      altText?: string;
    };
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
    edges: ShopifyVariant[];
  };
  options: {
    name: string;
    values: string[];
  }[];
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
