const LOCALSTORAGE_KEY = 'splitter-expenses'

export const saveState = (value: any) => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(value))
}

export const getState = () => {
  return localStorage.getItem(LOCALSTORAGE_KEY)
}
