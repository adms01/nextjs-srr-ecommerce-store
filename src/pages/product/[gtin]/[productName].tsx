import React, { useState, useContext } from "react";
import Layout from "../../../components/Layout";
import { getProduct } from "../../../utils/api";
import { Product, ProductInBasket } from "../../../types";
import styled from "styled-components";
import BasketContext from "../../../contexts/basketContext";
import { device } from "../../../assets/breakpoints";

type Props = {
  product: Product;
};

type Query = {
  query: {
    gtin: string;
  };
};

export async function getServerSideProps({ query: { gtin } }: Query) {
  const product: Product = await getProduct(gtin);
  return { props: { product } };
}

const ProductPage = ({ product }: Props) => {
  const basketCtx = useContext(BasketContext);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const availableQuantity = [...Array(100 > 5 ? 5 : 100).keys()];

  const addToBasketHandler = () => {
    if (product) {
      const _product: ProductInBasket = {
        ...product,
        quantity: Number(selectedQuantity),
      };

      basketCtx.addToBasket(_product);
    }
  };

  const quantityHandler = (e: any) => {
    setSelectedQuantity(e.target.value);
  };

  return (
    <Layout>
      {product && (
        <S.Product>
          <div className="product-left">
            <img src={product.imageUrl} alt="" />
          </div>

          <div className="product-right">
            <S.ProductTitle>{product.name}</S.ProductTitle>

            <S.BrandName>{product.brandName}</S.BrandName>

            <S.Price>
              {product.recommendedRetailPriceCurrency === "EUR" && <span>€</span>} {product.recommendedRetailPrice}
            </S.Price>

            <S.QuantitySelector>
              <p>Quantity:</p>
              <select onClick={quantityHandler}>
                {availableQuantity.map((x, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </S.QuantitySelector>

            <button className="btn product-main-btn" onClick={addToBasketHandler}>
              Add to Basket
            </button>
          </div>
        </S.Product>
      )}
    </Layout>
  );
};

export default ProductPage;

const S: any = {};

S.Product = styled.div`
  display: flex;
  margin-top: 50px;

  .product-left {
    max-width: 400px;
    width: 100%;
  }

  .product-right {
    margin-left: 30px;
    display: flex;
    flex-direction: column;
  }

  .product-main-btn {
    width: 150px;
  }

  @media ${device.tablet} {
    flex-direction: column;
    .product-right {
      margin-left: 0;
    }
  }
`;

S.BrandName = styled.span``;

S.ProductTitle = styled.h1`
  font-size: 24px;
`;

S.Price = styled.span`
  font-size: 30px;
  margin: 20px 0 0px 0;
  font-weight: 600;
  color: rgb(255, 92, 147);
`;

S.QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;

  p {
    color: black;
    margin-right: 6px;
    font-size: 14px;
    line-height: 20px;
  }

  select {
    border: 1px solid #ddd;
    border-radius: 4px 4px 4px 4px;
    padding: 3px;
  }
`;
