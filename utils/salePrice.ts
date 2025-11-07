export const nowPrice = (price: number, sale: number): number => {
  return price - (price * sale) / 100;
};
export const minusedPrice = (price: number, sale: number): number => {
  return price - nowPrice(price, sale);
};
