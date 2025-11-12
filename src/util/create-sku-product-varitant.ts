export const createSkuProductVaritant = (
  product_name: string,
  name: string,
  value: string,
) => {
  const productNameBase = product_name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // bỏ dấu tiếng Việt
    .replace(/[^a-zA-Z0-9]/g, '') // bỏ ký tự đặc biệt
    .substring(0, 3)
    .toUpperCase();
  const nameBase = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase();
  const sku = `${productNameBase}-${nameBase}-${value.toUpperCase()}`;
  return sku;
};
