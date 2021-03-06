import styled, { createGlobalStyle } from "styled-components"
import BGImage from "./images/koes-nadi.jpg"

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    background-image: url(${BGImage});
    background-size: cover;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0 20px;
  }
  * {
    box-sizing: border-box;
    font-family: "Catamaran", sans-serif;
  }
`

type WrapperProps = {
  isDisabled: boolean
}

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  > p {
    color: #fff;
  }
  .score, .category {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }
  h1 {
    background-clip: text;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    background-size: 100%;
    filter: drop-shadow(2px 2px #0085a3);
    font-family: "Fascinate Inline", cursive;
    font-size: 70px;
    font-weight: 400;
    margin: 20px;
    text-align: center;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .start, .next {
    background: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38558;
    border-radius: 10px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }
  .start {
    background: ${({ isDisabled }: WrapperProps) =>
      isDisabled && "linear-gradient(180deg, #fff, rgba(255, 204, 145, 0.75))"};
    border-color: ${({ isDisabled }: WrapperProps) =>
      isDisabled && "rgba(211, 133, 88, 0.75)"};
    cursor: ${({ isDisabled }: WrapperProps) =>
      isDisabled && "default"};
  }
`
