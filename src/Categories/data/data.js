import {apiUrl} from "../../service/api";

export const getProducts = async () => {
  const response = await fetch(`${apiUrl}/products/get`);
  const data = await response.json();

  return data.map(({ id, ...rest }) => ({
    productId: id,
    ...rest
  }));
};


