import { GraphQLClient } from 'graphql-request';

const shopifyEndpoint = import.meta.env.VITE_STOREFRONT_API;
const storefrontAccessToken = import.meta.env.VITE_STOREFRONT_ACCESS_TOKEN;

export const shopifyClient = new GraphQLClient(shopifyEndpoint, {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
  },
});

// Helper function to handle API requests
const handleRequest = async <T>(query: string, variables = {}) => {
  try {
    console.log('Making request to Shopify API:', {
      query,
      variables,
    });
    const response = await shopifyClient.request<T>(query, variables);
    console.log('Shopify API Response:', response);
    return response;
  } catch (error) {
    console.error('Shopify API Error:', error);
    throw error;
  }
};

export const gql = String.raw;

// Query to fetch products
export const QUERY_PRODUCTS = gql`
  query GetProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

// Mutation to create cart
export const CREATE_CART = gql`
  mutation CreateCart {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
    }
  }
`;

// Mutation to add items to cart
export const ADD_TO_CART = gql`
  mutation AddToCart($cartId: ID!, $variantId: ID!) {
    cartLinesAdd(
      cartId: $cartId
      lines: [{ quantity: 1, merchandiseId: $variantId }]
    ) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    images(first: 1) {
                      edges {
                        node {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface ProductsResponse {
  products: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        handle: string;
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
    }>;
  };
}

interface CreateCartResponse {
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
    };
  };
}

interface AddToCartResponse {
  cartLinesAdd: {
    cart: {
      id: string;
      lines: {
        edges: Array<{
          node: {
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
          };
        }>;
      };
    };
  };
}

// Export wrapped query functions with types
export const queryProducts = () => handleRequest<ProductsResponse>(QUERY_PRODUCTS);
export const createCart = () => handleRequest<CreateCartResponse>(CREATE_CART);
export const addToCart = (variables: { cartId: string; variantId: string }) =>
  handleRequest<AddToCartResponse>(ADD_TO_CART, variables);
