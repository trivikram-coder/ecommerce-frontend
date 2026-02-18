import {apiUrl} from "../../service/api";

export const getProducts = async () => {
  const response = await fetch(`${apiUrl}/products`);
  const data = await response.json();

  return data.map(({ _id, ...rest }) => ({
    productId: _id,
    ...rest
  }));
};


