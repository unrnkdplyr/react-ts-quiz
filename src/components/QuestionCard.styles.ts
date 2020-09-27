import styled from "styled-components"

type ButtonWrapperProps = {
  isCorrect: boolean
  isClicked: boolean
}

export const ButtonWrapper = styled.div`
  transition: all 0.3s ease;
  :hover {
    opacity: 0.8;
  }
  button {
    background: ${({isCorrect, isClicked}: ButtonWrapperProps) =>
      isCorrect
        ? "linear-gradient(90deg, #56ffa4, #59bc96)"
        : !isCorrect && isClicked
          ? "linear-gradient(90deg, #ff5656, #c16868)"
          : "linear-gradient(90deg, #56ccff, #63afb4)"};
    border: 3px solid #fff;
    border-radius: 10px;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    color: #000;
    cursor: pointer;
    font-size: 0.8rem;
    height: 40px;
    margin: 5px 0;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
    user-select: none;
    width: 100%;
  }
`

export const Wrapper = styled.div`
  background: #ebfeff;
  border-radius: 10px;
  border: 2px solid #0085a3;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  max-width: 1100px;
  padding: 20px;
  text-align: center;
  p {
    font-size: 1rem;
  }
`
