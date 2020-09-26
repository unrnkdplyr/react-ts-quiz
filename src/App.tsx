import React, { useEffect, useState } from "react"
import { QuestionCard } from "./components/QuestionCard"
import { Category, QuestionState, fetchQuizCategories, fetchQuizQuestions } from "./Api"
import { GlobalStyle, Wrapper } from "./App.styles"
import { CategoryCard } from "./components/CategoryCard"

export type Answer = {
  answer:        string
  correctAnswer: string
  isCorrect:     boolean
  question:      string
}

const App = () => {
  const [isGameOver, setIsGameOver] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState(10)
  const [category, setCategory] = useState(0)
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [difficulty, setDifficulty] = useState("easy")
  const [number, setNumber] = useState(0)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Answer[]>([])

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    const categories = await fetchQuizCategories()

    setCategoryList(categories)
  }

  const startTrivia = async () => {
    if (!number) {
      setIsLoading(true)
      setIsGameOver(false)

      const newQuestions = await fetchQuizQuestions({
        amount,
        category,
        difficulty
      })

      setQuestions(newQuestions)
      setScore(0)
      setUserAnswers([])
      setIsLoading(false)
    } else {
      setIsGameOver(true)
      setAmount(10)
      setCategory(0)
      setDifficulty("easy")
      setNumber(0)
      setScore(0)
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
      <Wrapper>
        <h1>TRIVIA QUIZ</h1>
        {(isGameOver || userAnswers.length === amount) && (
          <button className="start" onClick={startTrivia}>{!number ? "Start" : "New Game"}</button>
        )}
        {!isGameOver && <p className="score">Score: {score}</p>}
        {!isGameOver && !isLoading && <p className="category">Category: {questions[number].category}</p>}
        {isLoading && <p>Loading Questions ...</p>}
        {isGameOver ? (
          <CategoryCard
            list={categoryList}
            amountOnChange={e => setAmount(parseInt(e.target.value))}
            categoryOnChange={e => setCategory(parseInt(e.target.value))}
            difficultyOnChange={e => setDifficulty(e.target.value)}
          />
        ) : !isLoading && (
          <QuestionCard
            callback={checkAnswer}
            choices={questions[number].answer}
            question={questions[number].question}
            questionNo={number + 1}
            totalQuestions={amount}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
          />
        )}
        {!isGameOver && !isLoading && (userAnswers.length === number + 1) && (number !== amount - 1) && (
          <button className="next" onClick={nextQuestion}>Next</button>
        )}
      </Wrapper>
    </>
  )
}

export default App
