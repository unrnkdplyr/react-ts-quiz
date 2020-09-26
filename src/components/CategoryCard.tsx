import React from "react"
import { Category, Difficulty } from "../Api"
import { Wrapper } from "./CategoryCard.styles"

type Props = {
  amountOnChange:     (e: React.ChangeEvent<HTMLSelectElement>) => void
  categoryOnChange:   (e: React.ChangeEvent<HTMLSelectElement>) => void
  difficultyOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  list:               Category[]
}

export const CategoryCard: React.FC<Props> = ({
  amountOnChange,
  categoryOnChange,
  difficultyOnChange,
  list
}) => {
  let amountOptions = [10, 15, 20].map(amount => (
    <option key={amount} value={amount}>{amount}</option>
  ))
  let categoryOptions = list.map(({ id, name }) => (
    <option key={id} value={id}>{name}</option>
  ))
  const difficultyOptions = Difficulty.map(difficulty => (
    <option key={difficulty} value={difficulty}>{difficulty.toUpperCase()}</option>
  ))

  return (
    <Wrapper>
      <p>
        <label>No. of Questions : </label>
        <select onChange={amountOnChange}>{amountOptions}</select>
      </p>
      <p>
        <label>Category : </label>
        <select onChange={categoryOnChange}>
          <option value={0}>Any</option>
          {categoryOptions}
        </select>
      </p>
      <p>
        <label>Difficulty : </label>
        <select onChange={difficultyOnChange}>{difficultyOptions}</select>
      </p>
    </Wrapper>
  )
}
