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

// todo: [refactor] - split phases
// this code has four responsibilities
// first: calculate the base price
// second: calculate discount
// third: calculate shipping cost
// fourth: calculate the total order price
export function getBasePrice(product: Product, quantity: number): number {
  return product.basePrice * quantity;
}

export function priceOrder(
  product: Product,
  quantity: number,
  shippingMethod: ShippingMethod
) {
  let discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;

  let shippingPerCase =
    getBasePrice(product, quantity) > shippingMethod.discountThreshold
      ? shippingMethod.discountFee
      : shippingMethod.feePerCase;

  let shippingCost = quantity * shippingPerCase;

  let price = getBasePrice(product, quantity) - discount + shippingCost;

  return price;
}

let product: Product = {
  basePrice: 1000,
  discountThreshold: 7,
  discountRate: 1,
};

let shipping: ShippingMethod = {
  discountThreshold: 20,
  discountFee: 10,
  feePerCase: 2,
};

let orderPrice = priceOrder(product, 200, shipping);

console.log(orderPrice);
