import axios from "axios";

export const getProductsByPage = async (page: number) => {
  const res = await axios.get(`http://localhost:3000/api/products?page=${page}`);
  return res.data;
};

export const getProduct = async (gtin: string) => {
  const res = await axios.get(`http://localhost:3000/api/products/${gtin}`);
  return res.data;
};
