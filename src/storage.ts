import { Expense } from './types'

const LOCALSTORAGE_KEY = 'splitter-expenses'

export const persistState = (value: any) => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(value))
}

export const getPersistedState = (): Expense[] => {
  const localData = localStorage.getItem(LOCALSTORAGE_KEY)

  if (!localData) {
    return []
  }
  const parsedData = JSON.parse(localData)

  const correctFormat: Expense = {
    amount: 1,
    personId: 1,
  }
  const correctKeys = Object.keys(correctFormat)
  const storageIsInvalid = parsedData.some((expense: Expense) => {
    return !correctKeys.every((key) => expense.hasOwnProperty(key))
  })

  if (storageIsInvalid) return []

  return parsedData
}
