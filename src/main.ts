type ShippingMethod = {
  discountThreshold: number;
  discountFee: number;
  feePerCase: number;
};

type Product = {
  basePrice: number;
  discountThreshold: number;
  discountRate: number;
};

export function basePrice(product: Product, quantity: number): number {
  return product.basePrice * quantity;
}

function discount(product: Product, quantity: number): number {
  return (
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate
  );
}

function shippingCost(
  product: Product,
  quantity: number,
  shippingMethod: ShippingMethod
): number {
  let shippingPerCase =
    basePrice(product, quantity) > shippingMethod.discountThreshold
      ? shippingMethod.discountFee
      : shippingMethod.feePerCase;

  return quantity * shippingPerCase;
}

export function priceOrder(
  product: Product,
  quantity: number,
  shippingMethod: ShippingMethod
) {
  return (
    basePrice(product, quantity) -
    discount(product, quantity) +
    shippingCost(product, quantity, shippingMethod)
  );
}
