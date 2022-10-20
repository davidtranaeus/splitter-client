import { Person } from '../types'

const PersonSelector = ({
  persons,
  currentPerson,
  handleSelect,
}: {
  persons: Person[]
  currentPerson: number
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

export default PersonSelector
