import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import down_icon from "../assets/images/down-icon.svg";
import { useOuterClick } from "../utils/useOuterClick";

type Dropdown = {
  currentValue: number | string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
  options: any;
  updateValue: (id: number | string, newValue: number | string) => void;
};

function Dropdown({ currentValue, isOpen, setIsOpen, options, updateValue, id }: Dropdown) {
  const innerRef = useOuterClick((e: any) => {
    setIsOpen(!isOpen);
  });

  return (
    <>
      <S.Dropdown onClick={() => setIsOpen(!isOpen)}>
        <div className={`dropdown ${isOpen ? "dropdown-active" : ""}`}>
          <span className="dropdown-text">
            <span className="dropdown-label">Qty:</span>
            <span className="dropdown-prompt">{currentValue}</span>
          </span>
          {/* <img src={down_icon} alt="dropdown arrow" /> */}
        </div>

        {isOpen && (
          <S.DDContainer ref={innerRef}>
            {
              //@ts-ignore
              Object.values(...options).map((x: number, i) => (
                <button
                  type="button"
                  key={i}
                  className={`dd-list-item ${x === currentValue ? "dd-list-item-active" : ""}`}
                  onClick={() => updateValue(id, x)}
                >
                  <p>{x}</p>
                </button>
              ))
            }
          </S.DDContainer>
        )}
      </S.Dropdown>
    </>
  );
}

export default Dropdown;

const S: any = {};

S.DDContainer = styled.div`
  position: absolute;
  margin-top: 2px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #d5d9d9;
  border-radius: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: white;
  width: 91px;
  z-index: 700;
  overflow-y: auto;
  outline: none;
  left: 0;
  top: 100%;

  .dd-list-item {
    width: 100%;
    text-align: left;
    padding: 7px 0 7px 16px;
    background-color: white;
    border: 0;
    cursor: pointer;
    font-size: 16px;
    display: block;
    border-top: 0.5px solid transparent;

    border-bottom: 0.5px solid transparent;
  }

  .dd-list-item p {
    color: #0f1111;
    font-size: 14px;
  }

  .dd-list-item:hover {
    background-color: #f0f2f2;
    border-bottom: 0.5px solid #d5d9d9;
    border-top: 0.5px solid #d5d9d9;
  }

  .dd-list-item-active {
    background-color: #edfdff;
  }
`;

S.Dropdown = styled.div`
  position: relative;

  .dropdown img {
    width: 10px;
    height: 8px;
  }

  .dropdown {
    border-radius: 7px;
    background: #f0f2f2;
    box-shadow: 0 2px 5px rgba(15, 17, 17, 0.15);
    padding: 0 10px 0px 11px;
    cursor: pointer;
    border: 1px solid #d0d4d4;
    position: relative;
    white-space: nowrap;
  }

  .dropdown:hover {
    background-color: #e3e6e6;
  }

  .dropdown-active {
    border-color: #007185;
    box-shadow: 0 0 0 3px #c8f3fa;
  }

  .dropdown-text {
    padding-right: 8px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    z-index: 10;
    font-size: 13px;
    line-height: 29px;
    white-space: nowrap;
  }

  .dropdown-label {
    margin-right: 6px;
  }
`;
