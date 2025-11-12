export const createSku = (
  product_name: string,
) => {
  const productNameBase = product_name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
    .replace(/[^a-zA-Z0-9]/g, "") // bỏ ký tự đặc biệt
    .substring(0, 3)
    .toUpperCase();
  const sku = `${productNameBase}`;
  return sku;
};
