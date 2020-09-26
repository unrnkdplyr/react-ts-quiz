import { sortArray, shuffleArray, trimString } from "./utils"

export type Category = {
  id:   number
  name: string
}

export const fetchQuizCategories = async () => {
  const endpoint = "https://opentdb.com/api_category.php"
  const data = await (await fetch(endpoint)).json()
  const categoryArray: Category[] = data.trivia_categories.map((category: Category) => {
    let name = category.name
    if (name.indexOf(": ") > -1) {
      name = trimString(name, ": ")
    }

    return {
      ...category,
      name
    }
  })

  return sortArray(categoryArray, "name")
}

export const Difficulty = ["easy", "medium", "hard"]

export type Question = {
  category:          string
  correct_answer:    string
  difficulty:        string
  incorrect_answers: string[]
  question:          string
  type:              string
}

export type QuestionState = Question & { answer: string[] }

export type QuizQuestions = {
  amount:     number
  category:   number
  difficulty: string
}

export const fetchQuizQuestions = async ({
  amount,
  category,
  difficulty
}: QuizQuestions) => {
  console.log({
    amount,
    category,
    difficulty
  })
  let endpoint = `https://opentdb.com/api.php?amount=${amount}&`
  if (category) endpoint += `category=${category}&`
  endpoint += `difficulty=${difficulty}`
  // const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`
  // const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
  const data = await (await fetch(endpoint)).json()

  return data.results.map((question: Question) => {
    let category = question.category
    if (category.indexOf(": ") > -1) {
      category = trimString(category, ": ")
    }

    return {
      ...question,
      category,
      answer: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer
      ])
    }
  })
}
