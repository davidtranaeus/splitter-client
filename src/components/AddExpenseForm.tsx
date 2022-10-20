const AddExpenseForm = ({ handleClick }: { handleClick: Function }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
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

export default AddExpenseForm
