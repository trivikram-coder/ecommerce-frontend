import apiKey from "../../service/api";

export const getProducts = async () => {
  const response = await fetch(`${apiKey}/products/get`);
  const data = await response.json();

  return data.map(({ id, ...rest }) => ({
    productId: id,
    ...rest
  }));
};


