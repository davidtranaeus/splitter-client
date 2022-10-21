import { useEffect, useState } from 'react'
import PersonSelector from './PersonSelector'
import AddExpenseForm from './AddExpenseForm'
import ExpenseList from './ExpenseList'
import { Person, Expense } from './../types'
import { getPersistedState, persistState } from './../storage'

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>(getPersistedState)
  const [persons, _setPersons] = useState<Person[]>([
    {
      id: 0,
      icon: '🦖',
    },
    {
      id: 1,
      icon: '🐴',
    },
  ])
  const [currentPerson, setCurrentPerson] = useState<number>(null)
  const [settledSum, setSettledSum] = useState<string>()

  const addExpense = (expense: string) => {
    setExpenses((currentExpenses: Expense[]) => {
      const updatedExpenses: Expense[] = [
        ...currentExpenses,
        {
          amount: parseInt(expense),
          personId: persons.find((p) => p.id === currentPerson).id,
        },
      ]
      persistState(updatedExpenses)
      return updatedExpenses
    })
  }

  const sumExpenses = (id: number) => {
    return expenses.reduce((total: number, expense: Expense) => {
      if (expense.personId !== id) return total
      return total + expense.amount
    }, 0)
  }

  const clearExpenses = () => {
    if (!window.confirm('👋?')) return
    setExpenses([])
    persistState([])
  }

  const removeExpense = (removeIndex: number) => {
    setExpenses((currentExpenses: Expense[]) => {
      const updatedExpenses = currentExpenses.filter((_, index) => {
        return index !== removeIndex
      })
      persistState(updatedExpenses)
      return updatedExpenses
    })
  }

  useEffect(() => {
    const owedSums = persons.map((person) => {
      return sumExpenses(person.id) / 2
    })
    const diff = owedSums[0] - owedSums[1]
    const receiver = diff > 0 ? persons[0] : persons[1]
    const sender = diff > 0 ? persons[1] : persons[0]

    setSettledSum(`${sender.icon} → ${Math.abs(diff)} → ${receiver.icon}`)
  }, [expenses])

  return (
    <>
      <PersonSelector
        persons={persons}
        currentPerson={currentPerson}
        handleSelect={setCurrentPerson}
      />
      <div className="flex mt-4">
        {currentPerson !== null && <AddExpenseForm handleClick={addExpense} />}
        {expenses.length !== 0 && (
          <>
            <button
              className="w-12 h-12 border rounded-md bg-slate-100 text-xl"
              onClick={clearExpenses}
            >
              🧹
            </button>
          </>
        )}
      </div>
      {expenses.length !== 0 && (
        <span className="text-4xl mt-8">{settledSum}</span>
      )}
      <ExpenseList
        expenses={expenses}
        onRemove={removeExpense}
        persons={persons}
      />
    </>
  )
}

export default App
