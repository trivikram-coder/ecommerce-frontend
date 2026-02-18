import { apiUrl } from "../../service/api";

export const getProducts = async () => {
  const response = await fetch(`${apiUrl}/products`);
  const data = await response.json();

  const list = data?.products || data || [];

  return list
    .slice(0, 24) // ✅ only first 24 products
    .map(({ _id, ...rest }) => ({
      productId: _id,
      ...rest
    }));
};
