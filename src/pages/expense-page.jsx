import React from 'react'
import ExpenseHeader from '../components/expense-header'
import ExpenseTable from '../components/expense-table'
import CreateExpense from '../components/create-expense'
import DeleteExpense from '../components/delete-expense'
import UpdateExpense from '../components/update-expense'
import TotalExpense from '../components/total-expense'

function Expenses() {
  return (
    <div className="p-4">
      <ExpenseHeader></ExpenseHeader>
      <ExpenseTable></ExpenseTable>
      <CreateExpense></CreateExpense>
      <UpdateExpense></UpdateExpense>
      <DeleteExpense></DeleteExpense>
      <TotalExpense></TotalExpense>
    </div>
  )
}

export default Expenses
