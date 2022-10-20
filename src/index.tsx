import './index.css'

import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

type Person = {
  id: number;
  icon: string;
}

type Expense = {
  amount: number;
  person: Person;
}

const ExpenseView = () => {
  const [expenses, setExpenses] = useState(() => {
    const localData = localStorage.getItem('splitter-expenses')
    return localData ? JSON.parse(localData) : []
  })

  const persons: Person[] = [
    {
      id: 1,
      icon: '🦖',
    },
    {
      id: 2,
      icon: '🐴',
    },
  ]
  const [currentPerson, setCurrentPerson] = useState<number>()
  const [settledSum, setSettledSum] = useState<string>()

  const addExpense = (expense: string) => {
    setExpenses((currentExpenses: Expense[]) => {
      const updatedExpenses: Expense[] = [
        ...currentExpenses,
        {
          amount: parseInt(expense),
          person: persons.find((p) => p.id === currentPerson),
        },
      ]
      localStorage.setItem('splitter-expenses', JSON.stringify(updatedExpenses))
      return updatedExpenses
    })
  }

  const sumExpenses = (id: number) => {
    return expenses.reduce((total: number, expense: Expense) => {
      if (expense.person.id !== id) return total
      return total + expense.amount
    }, 0)
  }

  const settleExpenses = () => {
    const owedSums = persons.map((person) => {
      return sumExpenses(person.id) / 2
    })
    const diff = owedSums[0] - owedSums[1]
    const receiver = diff > 0 ? persons[0] : persons[1]
    const sender = diff > 0 ? persons[1] : persons[0]

    setSettledSum(`${sender.icon} → ${Math.abs(diff)} → ${receiver.icon}`)
  }

  const clearExpenses = () => {
    if (!window.confirm('👋?')) return
    setExpenses([])
    localStorage.setItem('splitter-expenses', '[]')
  }

  const deleteExpense = (deleteIndex: number) => {
    setExpenses((currentExpenses: Expense[]) => {
      const updatedExpenses = currentExpenses.filter((_, index) => {
        return index !== deleteIndex
      })
      localStorage.setItem('splitter-expenses', JSON.stringify(updatedExpenses))
      return updatedExpenses
    })
  }

  useEffect(settleExpenses, [expenses])

  return (
    <>
      <SelectPersonForm
        persons={persons}
        currentPerson={currentPerson}
        handleSelect={setCurrentPerson}
      />
      <div className="flex mt-4">
        {currentPerson && <AddExpenseForm handleClick={addExpense} />}
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
      <ul className="mt-4">
        {expenses.map((expense: Expense, index: number) => {
          return (
            <li className="mt-4" key={index}>
              <button onClick={() => deleteExpense(index)} className="mr-4">
                ❌
              </button>
              <span className="text-lg">
                {expense.amount} {expense.person.icon}
              </span>
            </li>
          )
        })}
      </ul>
    </>
  )
}

const SelectPersonForm = ({ persons, currentPerson, handleSelect }: {
  persons: Person[],
  currentPerson: number,
  handleSelect: Function
}) => {
  return (
    <ul className="flex w-3/4 justify-evenly mt-8">
      {persons.map((person, index) => {
        return (
          <li
            className="flex justify-center w-20 h-20 border rounded-md bg-slate-100"
            key={index}
          >
            <button
              className={`w-full text-4xl ${
                person.id === currentPerson ? 'bg-sky-200' : ''
              }`}
              onClick={() => handleSelect(person.id)}
            >
              {person.icon}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

const AddExpenseForm = ({ handleClick }: { handleClick: Function }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement;
    handleClick((target[0] as HTMLInputElement).value)
    target.reset()
  }
  return (
    <form className="flex flex-row" onSubmit={handleSubmit}>
      <input
        className="border rounded-md mr-2 text-xl"
        type="number"
        required
        name="expense"
      />
      <input
        className="w-12 h-12 border rounded-md bg-slate-100 mr-2"
        type="submit"
        value="➕"
      />
    </form>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<ExpenseView />)
