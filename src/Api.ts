import { sortArray, shuffleArray, trimString } from "./utils"

const OpenTDB = (file?: string) => {
  let uri = "https://opentdb.com/api"
  if (file) uri += `_${file}`
  uri += ".php"

  return uri
}

export type Category = {
  id:   number
  name: string
}

export const fetchQuizCategories = async () => {
  const data = await (await fetch(OpenTDB("category"))).json()
  const categoryArray: Category[] = data.trivia_categories.map(({ id, name }: Category) => {
    if (name.indexOf(": ") > -1) {
      name = trimString(name, ": ")
    }

    return { id, name }
  })

  return sortArray(categoryArray, "name")
}

export type QuizCount = {
  category:   number
  difficulty: string
}

export const fetchQuizCount = async ({
  category,
  difficulty
}: QuizCount) => {
  let query = `/?category=${category}`
  console.log(`Fetch Count: ${query}&difficulty=${difficulty}`)

  const data = await (await fetch(OpenTDB("count") + query)).json()

  return data.category_question_count[`total_${difficulty}_question_count`]
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

export type QuizQuestions = QuizCount & { amount: number }

export const fetchQuizQuestions = async ({
  amount,
  category,
  difficulty
}: QuizQuestions) => {
  let query = `/?amount=${amount}&`
  if (category) query += `category=${category}&`
  query += `difficulty=${difficulty}`
  console.log(`Fetch Questions: ${query}`)

  const data = await (await fetch(OpenTDB() + query)).json()
  const array = data.results.map((question: Question) => {
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

  return shuffleArray(array)
}
