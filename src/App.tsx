import React, { useState } from "react"
import { QuestionCard } from "./components/QuestionCard"
import { Difficulty, QuestionState, fetchQuizQuestions } from "./Api"
import { GlobalStyle, Wrapper } from "./App.styles"

export type Answer = {
  answer:        string
  correctAnswer: string
  isCorrect:     boolean
  question:      string
}

const TOTAL_QUESTIONS = 10

const App = () => {
  const [isGameOver, setIsGameOver] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [number, setNumber] = useState(0)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Answer[]>([])


  const startTrivia = async () => {
    setIsLoading(true)
    setIsGameOver(false)

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )

    setQuestions(newQuestions)
    setNumber(0)
    setScore(0)
    setUserAnswers([])
    setIsLoading(false)
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

  const nextQuestion = () => {
    const question = number + 1
    if (question === TOTAL_QUESTIONS) {
      setIsGameOver(true)
    } else {
      setNumber(question)
    }
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {(isGameOver || userAnswers.length === TOTAL_QUESTIONS) && (
          <button className="start" onClick={startTrivia}>Start</button>
        )}
        {!isGameOver && <p className="score">Score: {score}</p>}
        {isLoading && <p>Loading Questions ...</p>}
        {!isLoading && !isGameOver && (
          <QuestionCard
            callback={checkAnswer}
            choices={questions[number].answer}
            question={questions[number].question}
            questionNo={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
          />
        )}
        {!isGameOver && !isLoading && (userAnswers.length === number + 1) && (number !== TOTAL_QUESTIONS - 1) && (
          <button className="next" onClick={nextQuestion}>Next</button>
        )}
      </Wrapper>
    </>
  )
}

export default App
