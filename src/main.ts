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

function priceOrder(
  product: Product,
  quantity: number,
  shippingMethod: ShippingMethod
) {
  let basePrice = product.basePrice * quantity;

  let discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;

  let shippingPerCase =
    basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountFee
      : shippingMethod.feePerCase;

  let shippingCost = quantity * shippingPerCase;

  let price = basePrice - discount + shippingCost;

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
