import { Expense, Person } from '../types'

type Props = {
  expenses: Expense[]
  onRemove: Function
  persons: Person[]
}

const ExpenseList = ({ expenses, persons, onRemove }: Props) => {
  return (
    <ul className="mt-4">
      {expenses.map((expense: Expense, index: number) => {
        const icon = persons.find((p) => p.id === expense.personId).icon

        return (
          <li className="mt-4" key={index}>
            <button onClick={() => onRemove(index)} className="mr-4">
              ❌
            </button>
            <span className="text-lg">
              {expense.amount} {icon}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export default ExpenseList
