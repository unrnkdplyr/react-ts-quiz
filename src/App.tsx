import React, { useEffect, useState } from "react"
import { QuestionCard } from "./components/QuestionCard"
import {
  Category, QuestionState,
  fetchQuizCategories, fetchQuizCount, fetchQuizQuestions
} from "./Api"
import { GlobalStyle, Wrapper } from "./App.styles"
import { CategoryCard } from "./components/CategoryCard"

const DEFAULT = {
  AMOUNT:       5,
  AMOUNT_LIST:  [5, 10, 15, 20],
  NUMBER:       0,
  SCORE:        0,
  USER_ANSWERS: []
}

export type Answer = {
  answer:        string
  correctAnswer: string
  isCorrect:     boolean
  question:      string
}

const App = () => {
  const [isGameOver, setIsGameOver] = useState(true)
  const [isLoadingCount, setIsLoadingCount] = useState(false)
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false)
  const [amount, setAmount] = useState(DEFAULT.AMOUNT)
  const [amountList, setAmountList] = useState(DEFAULT.AMOUNT_LIST)
  const [category, setCategory] = useState(0)
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [difficulty, setDifficulty] = useState("easy")
  const [number, setNumber] = useState(DEFAULT.NUMBER)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [score, setScore] = useState(DEFAULT.SCORE)
  const [userAnswers, setUserAnswers] = useState<Answer[]>(DEFAULT.USER_ANSWERS)

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    handleAmountList() // eslint-disable-next-line
  }, [category, difficulty])

  const getCategories = async () => {
    const categories = await fetchQuizCategories()

    setCategoryList(categories)
  }

  const handleAmountList = async () => {
    setIsLoadingCount(true)

    let newAmountList = DEFAULT.AMOUNT_LIST
    if (category) {
      const count:number = await fetchQuizCount({
        category,
        difficulty
      })

      newAmountList = [DEFAULT.AMOUNT]
      for (let i = 10;i <= 20;i += 5) {
        if (i > count) break
        newAmountList.push(i)
      }
    }

    if (amountList.length !== newAmountList.length) {
      setAmount(DEFAULT.AMOUNT)
      setAmountList(newAmountList)
    }

    setIsLoadingCount(false)
  }

  const startTrivia = async () => {
    if (!number) {
      setIsLoadingQuestions(true)
      setIsGameOver(false)

      const newQuestions = await fetchQuizQuestions({
        amount,
        category,
        difficulty
      })

      setQuestions(newQuestions)
      setScore(DEFAULT.SCORE)
      setUserAnswers(DEFAULT.USER_ANSWERS)
      setIsLoadingQuestions(false)
    } else {
      setIsGameOver(true)
      setNumber(DEFAULT.NUMBER)
      setScore(DEFAULT.SCORE)
    }
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isGameOver) {
      const answer = e.currentTarget.value
      const isCorrect = questions[number].correct_answer === answer
      if (isCorrect) setScore(prev => prev + 1)

      const answerObject = {
        answer,
        correctAnswer: questions[number].correct_answer,
        isCorrect,
        question: questions[number].question
      }

      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  const nextQuestion = () => setNumber(number + 1)

  return (
    <>
      <GlobalStyle />
      <Wrapper isDisabled={isLoadingCount}>
        <h1>TRIVIA QUIZ</h1>
        {(isGameOver || userAnswers.length === amount) && (
          <button
            className="start"
            disabled={isLoadingCount}
            onClick={startTrivia} >
              {!number ? "Start" : "New Game"}
          </button>
        )}
        {!isGameOver && <p className="score">Score: {score}</p>}
        {!isGameOver && !isLoadingQuestions && <p className="category">Category: {questions[number].category}</p>}
        {isLoadingQuestions && <p>Loading Questions ...</p>}
        {isGameOver ? (
          <CategoryCard
            amountList={amountList}
            amountOnChange={e => setAmount(parseInt(e.target.value))}
            amountValue={amount}
            categoryList={categoryList}
            categoryOnChange={e => setCategory(parseInt(e.target.value))}
            categoryValue={category}
            difficultyOnChange={e => setDifficulty(e.target.value)}
            difficultyValue={difficulty}
            isAmountDisabled={isLoadingCount}
          />
        ) : !isLoadingQuestions && (
          <QuestionCard
            callback={checkAnswer}
            choices={questions[number].answer}
            question={questions[number].question}
            questionNo={number + 1}
            totalQuestions={amount}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
          />
        )}
        {!isGameOver && !isLoadingQuestions && (userAnswers.length === number + 1) && (number !== amount - 1) && (
          <button className="next" onClick={nextQuestion}>Next</button>
        )}
      </Wrapper>
    </>
  )
}

export default App
