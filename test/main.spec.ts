import { priceOrder } from "../src/main";

describe("Order Price", () => {
  let product = {
    basePrice: 1000,
    discountThreshold: 7,
    discountRate: 1,
  };

  let shipping = {
    discountThreshold: 20,
    discountFee: 10,
    feePerCase: 2,
  };
  it("Should return 9000 as order total price", () => {
    let result = priceOrder(product, 200, shipping);

    expect(result).toBe(9000);
  });
});
