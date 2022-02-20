import { useContext } from "react";
import Layout from "../../components/Layout";
import BasketContext from "../../contexts/basketContext";
import styled from "styled-components";
import { BasketItem } from "../../components/BasketItem";
import { device } from "../../assets/breakpoints";

const BasketPage = () => {
  const basketCtx = useContext(BasketContext);
  const basketItems = basketCtx.items;
  const subtotal = basketItems.reduce((acc, curr) => acc + curr.recommendedRetailPrice * curr.quantity, 0).toFixed(2);
  const quantityOfItems = basketItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const updateQuantityHandler = (gtin: string, newQuantity: number) => {
    basketCtx.updateQuantity(gtin, newQuantity);
  };

  const removeItemHandler = (gtin: string) => {
    basketCtx.removeFromBasket(gtin);
  };

  return (
    <Layout>
      <S.CartPage>
        {quantityOfItems === 0 && <p>Empty Basket</p>}

        {basketItems.length >= 1 && (
          <div className="top">
            <div className="shopping-basket">
              <div className="basket-header">
                <h1>Shopping Basket</h1>

                <div className="price-title">Price</div>
              </div>

              <div className="item-container">
                {basketItems.map((x) => (
                  <BasketItem
                    key={x.gtin}
                    name={x.name}
                    gtin={x.gtin}
                    imageUrl={x.imageUrl}
                    recommendedRetailPrice={x.recommendedRetailPrice}
                    quantity={x.quantity}
                    updateQuantityHandler={updateQuantityHandler}
                    removeItemHandler={removeItemHandler}
                  />
                ))}
              </div>

              <div className="subtotal">
                <p>Subtotal {quantityOfItems > 1 ? `(${quantityOfItems} items):` : `(${quantityOfItems} item): `}</p>
                <span className="bold">€{subtotal}</span>
              </div>
            </div>

            <div className="checkout-box">
              <p>
                Subtotal {quantityOfItems > 1 ? `(${quantityOfItems} items):` : `(${quantityOfItems} item): `}
                <span className="bold">€{subtotal}</span>
              </p>

              <button>
                <p>Proceed to Checkout</p>
              </button>
            </div>
          </div>
        )}
      </S.CartPage>
    </Layout>
  );
};
export default BasketPage;

const S: any = {};

S.CartPage = styled.div`
  .top {
    display: flex;
    margin: 40px 0px;
    justify-content: space-between;
    max-width: 100%;
  }

  .shopping-basket {
    /* margin-top: 50px; */
    background-color: white;
    padding: 20px 20px 40px 20px;
    width: 100%;
  }

  .basket-header {
    border-bottom: 1px solid #ddd;
  }

  .basket-header h1 {
    font-size: 28px;
    font-weight: 400;
    line-height: 36px;
  }

  .basket-header p {
    color: black;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
  }

  .checkout-box {
    margin-bottom: 20px;
    background-color: white;
    overflow: auto;
    padding: 20px 20px 15px 20px;
    margin-left: 20px;
    width: 20%;
    height: 212px;
    /* margin-top: -90px; */
  }

  .price-title {
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    color: #565959;
    line-height: 20px;
  }

  .subtotal {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .subtotal p {
    font-size: 18px;
    font-weight: 400;
    color: black;
    margin-right: 5px;
  }

  .bold {
    font-weight: 700;
  }

  .checkout-box p {
    font-size: 18px;
    line-height: 24px;
    color: #0f1111;
    margin-bottom: 19px;
  }

  .checkout-box button {
    width: 100%;
    border-style: solid;
    border-width: 1px;
    background: #ffd814;
    border-color: #fcd200;
    height: 31px;
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 0 2px 5px 0 rgb(213 217 217 / 50%);
    display: inline-block;
    white-space: nowrap;
  }

  .checkout-box button p {
    font-size: 13px;
    color: #0f1111;
    line-height: 29px;
  }

  @media ${device.laptop} {
    .top {
      flex-direction: column-reverse;
    }

    .adbanner {
      display: none;
    }

    .checkout-box {
      margin: 0;
      width: 100%;
      height: fit-content;
      overflow: hidden;
    }

    .shopping-basket {
      margin-top: 10px;
    }
  }

  @media ${device.tablet} {
    .price-title {
      display: none;
    }
  }
`;
