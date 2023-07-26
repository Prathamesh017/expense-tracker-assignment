import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { formatDate } from '../utils/utils'
import { showModal, setExpenseId } from '../feature/expense/expenseSlice'

function ExpenseTable() {
  let expenseData = useSelector((state) => state.expense.expenses)
  const sortDate = useSelector((state) => state.expense.sortByDate)
  const sortName = useSelector((state) => state.expense.sortByName)
  const expenseTableTitles = useSelector(
    (state) => state.expense.expenseTableTitles,
  )

  if (sortName) {
    expenseData = expenseData?.filter((expense) => {
      return expense.name.toLowerCase().startsWith(sortName.toLowerCase())
    })
  }
  if (sortDate) {
    expenseData = expenseData?.filter((expense) => {
      return expense.date === sortDate
    })
  }

  const dispatch = useDispatch()

  return (
    <>
      {expenseData && expenseData.length > 0 ? (
        <div className="table-container mt-20">
          <div className="w-full grid grid-cols-4 md:grid-cols-8">
            {expenseTableTitles.map((table) => {
              return (
                <div className="border border-black p-1 text-center bg-[#404040]">
                  {table}
                </div>
              )
            })}
          </div>
          <div>
            {expenseData.map((obj, index) => {
              return (
                <div className="grid grid-cols-4  md:grid-cols-8">
                  <p className="common-entities">{obj.name}</p>
                  <p className="common-entities">{obj.description}</p>
                  <p className="common-entities">{obj.category}</p>
                  <p className="common-entities">
                    {formatDate(new Date(obj.date))}
                  </p>
                  <p className="common-entities">{obj.amount}</p>
                  <p className="common-entities">{obj.updatedAt}</p>
                  <p className="common-entities">{obj.createdBy}</p>
                  <div className="common-entities flex space-x-2 px-2">
                    <AiFillEdit
                      size={20}
                      color="green"
                      className="hover:cursor-pointer"
                      onClick={() => {
                        dispatch(setExpenseId({ id: obj.id }))
                        dispatch(
                          showModal({
                            type: 'updateExpense',
                            isOpen: true,
                          }),
                        )
                      }}
                    ></AiFillEdit>
                    <AiFillDelete
                      size={20}
                      color="red"
                      className="hover:cursor-pointer"
                      onClick={() => {
                        dispatch(setExpenseId({ id: obj.id }))
                        dispatch(
                          showModal({
                            type: 'deleteExpense',
                            isOpen: true,
                          }),
                        )
                      }}
                    ></AiFillDelete>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <p className="mt-10 text-white text-xl">No Items to Show</p>
      )}
    </>
  )
}

export default ExpenseTable
