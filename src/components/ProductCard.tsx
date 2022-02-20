import React from "react";
import styled from "styled-components";
import { Product } from "../types";
import Link from "next/link";
import ClampLines from "react-clamp-lines";

export const ProductCard = ({ gtin, name, recommendedRetailPrice, recommendedRetailPriceCurrency, imageUrl }: Product) => {
  // const sanitizedName = name?.replaceAll(" ", "-").toLowerCase();

  return (
    <Link as={`/product/${gtin}/${encodeURI(name)}`} href={`/product/[gtin]/[productName]`}>
      <S.ProductCard>
        <div className="product-card-image">
          <img src={imageUrl} alt="" />
        </div>

        <div className="product-card-title">
          <ClampLines id={gtin} text={name} lines={2} buttons={false} />
        </div>

        <div className="product-card-price">
          <span className="currency">{recommendedRetailPriceCurrency === "EUR" ? "€" : "€"} </span>
          {recommendedRetailPrice}
        </div>
      </S.ProductCard>
    </Link>
  );
};

const S: any = {};

/**
 * //*Product Card UI
 */

S.ProductCard = styled.div`
  background-color: white;
  border: 1px solid #ebecfa;
  border-radius: 8px;
  cursor: pointer;
  width: 300px;
  height: 428px;
  padding: 20px;
  margin: 6px 6px;
  z-index: 40;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  :hover {
    border-color: #b9b9e7;
  }

  .product-card-image {
    max-width: 254px;
    max-height: 254px;
    object-fit: contain;
    max-width: 400px;
  }

  .product-card-title {
    margin-top: 22px;
    margin-bottom: 10px;
  }

  .product-card-title p {
    color: black;
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
  }

  .product-card-price {
    font-size: 20px;
    font-weight: 600;
    color: rgb(255, 92, 147);
  }
`;
