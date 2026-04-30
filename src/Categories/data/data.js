import {apiUrl} from "../../service/api";

export const getProducts = async () => {
  const response = await fetch(`${apiUrl}/products`);
  const data = await response.json();
  console.log("Products ",data)
  return data.products.map(({ _id, ...rest }) => ({
    productId: _id,
    ...rest
  }));
};


