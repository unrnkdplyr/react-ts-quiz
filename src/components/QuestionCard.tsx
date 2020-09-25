import React from "react"
import { Answer } from "../App"
import { ButtonWrapper, Wrapper } from "./QuestionCard.styles"

type Props = {
  callback:       (e: React.MouseEvent<HTMLButtonElement>) => void
  choices:        string[]
  question:       string
  questionNo:     number
  totalQuestions: number
  userAnswer?:    Answer
}

export const QuestionCard: React.FC<Props> = ({
  callback,
  choices,
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
            <button disabled={!!userAnswer} onClick={callback} value={choice}>
              <span dangerouslySetInnerHTML={{ __html: choice }} />
            </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
)
