import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showModal, deleteExpense } from '../feature/expense/expenseSlice'

function DeleteExpense() {
  const showExpense = useSelector(
    (state) => state.expense.showModals.deleteExpense,
  )

  const dispatch = useDispatch()

  return (
    <>
      {showExpense ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-11/12 md:w-1/4">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-ms font-semibold">
                    Are You Sure You Want To Delete this Expense?
                  </h3>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>
                      dispatch(
                        showModal({
                          type: 'deleteExpense',
                          isOpen: false,
                        }),
                      )
                    }
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:text-black cursor-pointer"
                    type="submit"
                    onClick={() => {
                      dispatch(deleteExpense())
                      dispatch(
                        showModal({
                          type: 'deleteExpense',
                          isOpen: false,
                        }),
                      )
                    }}
                  >
                    Delete Expense
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
export default DeleteExpense
