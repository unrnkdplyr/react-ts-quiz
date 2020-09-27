import React from "react"
import { Category, Difficulty } from "../Api"
import { Wrapper } from "./CategoryCard.styles"

type Props = {
  amountList:         number[]
  amountOnChange:     (e: React.ChangeEvent<HTMLSelectElement>) => void
  amountValue:        number
  categoryList:       Category[]
  categoryOnChange:   (e: React.ChangeEvent<HTMLSelectElement>) => void
  categoryValue:      number
  difficultyOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  difficultyValue:    string
  isAmountDisabled:   boolean
}

export const CategoryCard: React.FC<Props> = ({
  amountList,
  amountOnChange,
  amountValue,
  categoryList,
  categoryOnChange,
  categoryValue,
  difficultyOnChange,
  difficultyValue,
  isAmountDisabled
}) => {
  let amountOptions = amountList.map(amount => (
    <option key={amount} value={amount}>{amount}</option>
  ))
  let categoryOptions = categoryList.map(({ id, name }) => (
    <option key={id} value={id}>{name}</option>
  ))
  const difficultyOptions = Difficulty.map(difficulty => (
    <option key={difficulty} value={difficulty}>{difficulty.toUpperCase()}</option>
  ))

  return (
    <Wrapper>
      <p>
        <label>Category : </label>
        <select onChange={categoryOnChange} value={categoryValue}>
          <option value={0}>Any</option>
          {categoryOptions}
        </select>
      </p>
      <p>
        <label>Difficulty : </label>
        <select onChange={difficultyOnChange} value={difficultyValue}>{difficultyOptions}</select>
      </p>
      <p>
        <label>No. of Questions : </label>
        <select disabled={isAmountDisabled} onChange={amountOnChange} value={amountValue}>{amountOptions}</select>
      </p>
    </Wrapper>
  )
}
