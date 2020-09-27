import React from "react"
import { Answer } from "../App"
import { ButtonWrapper, Wrapper } from "./QuestionCard.styles"

type Props = {
  callback:       (e: React.MouseEvent<HTMLButtonElement>) => void
  choices:        string[]
  isTimeout:      boolean
  question:       string
  questionNo:     number
  totalQuestions: number
  userAnswer?:    Answer
}

export const QuestionCard: React.FC<Props> = ({
  callback,
  choices,
  isTimeout,
  question,
  questionNo,
  totalQuestions,
  userAnswer,
}) => (
  <Wrapper>
    <p className="number">
      Question: {questionNo} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {choices.map(choice => (
        <ButtonWrapper
          isCorrect={userAnswer?.correctAnswer === choice}
          key={choice}
          isClicked={userAnswer?.answer === choice} >
            <button disabled={isTimeout} onClick={callback} value={choice}>
              <span dangerouslySetInnerHTML={{ __html: choice }} />
            </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
)
