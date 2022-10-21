import { Expense } from './types'

const LOCALSTORAGE_KEY = 'splitter-expenses'

export const persistState = (value: any) => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(value))
}

export const getPersistedState = (): Expense[] => {
  const localData = localStorage.getItem(LOCALSTORAGE_KEY)
  return localData ? JSON.parse(localData) : []
}
