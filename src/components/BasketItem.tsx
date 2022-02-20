import React, { useState } from "react";
import styled from "styled-components";
import { ProductInBasket } from "../types";
import { device } from "../assets/breakpoints";
import Dropdown from "./Dropdown";

export const BasketItem = ({ name, gtin, imageUrl, recommendedRetailPrice, quantity, updateQuantityHandler, removeItemHandler }: any) => {
  const [isQtyDropdownOpen, setIsQtyDropdownOpen] = useState(false);

  type Options = {};

  const options: Options = [
    {
      option0: 0,
      option1: 1,
      option2: 2,
      option3: 3,
      option4: 4,
      option5: 5,
      option6: 6,
      option7: 7,
      option8: 8,
      option9: 9,
      option10: 10,
    },
  ];

  return (
    <S.BasketItem>
      <div className="item-image">
        <img src={imageUrl} alt="" />
      </div>

      <div className="item-content">
        <p className="item-title">{name}</p>

        <p className="dispatch-time">Usually dispatched within 1 to 3 weeks.</p>
        <p className="free-shipping">Eligible for FREE shipping</p>

        <div className="item-options">
          <div className="option">
            <Dropdown
              id={gtin}
              currentValue={quantity}
              isOpen={isQtyDropdownOpen}
              setIsOpen={setIsQtyDropdownOpen}
              options={options}
              updateValue={updateQuantityHandler}
            />
          </div>

          <div className="option">
            <p onClick={() => removeItemHandler(gtin)}>Delete</p>
          </div>
        </div>
      </div>

      {recommendedRetailPrice && quantity && (
        <div className="item-price">
          <p>€{(recommendedRetailPrice * quantity).toFixed(2)}</p>
        </div>
      )}
    </S.BasketItem>
  );
};

const S: any = {};

S.BasketItem = styled.div`
  border-bottom: 1px solid #ddd;
  display: flex;
  padding: 10px 0;
  flex-direction: row;
  align-items: center;

  .basket-item {
    border-bottom: 1px solid #ddd;
    display: flex;
    padding: 10px 0;
    flex-direction: row;
    align-items: center;
  }

  .item-image {
    margin-left: 20px;
    margin-right: 13px;
    height: 150px;
    width: 150px;
  }

  .item-image img {
    cursor: pointer;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .item-title {
    font-size: 18px;
    color: #082d42;
    font-weight: 700;
    line-height: 24px;
    cursor: pointer;
    word-wrap: break-word;
  }

  .dispatch-time {
    font-size: 12px;
    color: #c45500;
    line-height: 16px;
  }

  .free-shipping {
    color: #565959;
    font-size: 12px;
    line-height: 16px;
  }

  .item-content {
    align-self: start;
  }

  .item-options {
    display: flex;
    flex-wrap: wrap;
  }

  .option {
    margin-top: 10px;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  .option:first-child {
    padding-left: 0;
  }

  .option:last-child {
    border: 0;
  }

  .option p {
    color: #007185;
    line-height: 16px;
    font-size: 12px;
    cursor: pointer;
  }

  .item-price {
    align-self: flex-start;
    margin-left: auto;
  }

  .item-price p {
    color: #0f1111;
    font-size: 18px;
    font-weight: 700;
  }

  @media ${device.tablet} {
    flex-wrap: wrap;

    .item-image img {
      min-width: 20%;
      width: 100%;
    }

    .item-title {
      font-size: 15px;
    }

    .item-price {
      /* display: none; */
    }

    .item-content {
      height: 100%;
    }

    .item-options {
      flex-direction: column;
    }
  }
`;
