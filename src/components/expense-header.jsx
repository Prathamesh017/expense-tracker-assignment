import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  showModal,
  setSortName,
  setSortDate,
  reset,
} from '../feature/expense/expenseSlice'

function ExpenseHeader() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="header-container w-full grid grid-rows-1 md:grid-cols-2">
      <div className="header-title">
        <h1 className="text-white text-xl">My Expense Manager</h1>
      </div>

      <div className="header-functionalities mt-5 md:mt-0">
        <div className="w-full flex  justify-start md:justify-end space-x-4">
          <input
            type="date"
            onChange={(event) => {
              dispatch(setSortDate(event.target.value))
            }}
            className="px-1  md:p-1"
            placeholderText="sort by Date"
          />
          <input
            type="text"
            placeholder="search by name"
            onChange={(event) => dispatch(setSortName(event.target.value))}
            className="w-1/2 md:w-1/4 px-1 md:p-1"
          ></input>
        </div>
        <div className="header-buttons mt-5 w-full flex justify-start md:justify-end space-x-4">
          <button
            className="p-2  rounded-md bg-[#16a34a] hover:text-white cursor"
            onClick={() => {
              dispatch(showModal({ type: 'createExpense', isOpen: true }))
            }}
          >
            Create Expense
          </button>
          <button
            className="p-2 rounded-md  bg-[#ea580c] hover:text-white cursor"
            onClick={() => {
              navigate('/')
              dispatch(reset())
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExpenseHeader
