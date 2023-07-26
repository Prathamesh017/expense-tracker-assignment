import React from 'react'
import { useSelector } from 'react-redux'
function TotalExpense() {
  let expenseData = useSelector((state) => state.expense.expenses)
  let total = expenseData.reduce(
    (accumulator, currentObj) => accumulator + currentObj.amount,
    0,
  )
  return (
    <div className="w-full flex justify-end text-white mt-10">
      Total-Amount:{total}
    </div>
  )
}

export default TotalExpense
