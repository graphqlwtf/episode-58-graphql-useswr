export const CartFragment = /* GraphQL*/ `
  fragment Cart on Cart {
    id
    totalItems
    items {
      id
      name
      quantity
      images
      lineTotal {
        formatted
      }
    }
    subTotal {
      formatted
    }
  }
`;

export const GetCartById = /* GraphQL */ `
  query GetCartById($id: ID!) {
    cart(id: $id) {
      ...Cart
    }
  }
  ${CartFragment}
`;

export const AddToCart = /* GraphQL */ `
  mutation AddToCart($input: AddToCartInput!) {
    addItem(input: $input) {
      ...Cart
    }
  }
  ${CartFragment}
`;

export const RemoveFromCart = /* GraphQL */ `
  mutation RemoveFromCart($input: RemoveCartItemInput!) {
    removeItem(input: $input) {
      ...Cart
    }
  }
  ${CartFragment}
`;
