import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showModal, addExpense } from '../feature/expense/expenseSlice'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .max(140, 'Name Should Be Upto Only 140 characters'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  date: yup.string().required('Date is required'),
  amount: yup.number().positive(),
  createdBy: yup.string().required('User name  is Required'),
})
function CreateExpense() {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })
  const showExpense = useSelector(
    (state) => state.expense.showModals.createExpense,
  )
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    dispatch(addExpense(data))
    if (errors) {
      reset()
      dispatch(showModal({ type: 'createExpense', isOpen: false }))
    }
  }
  return (
    <>
      {showExpense ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-11/12 md:w-1/2">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Create Expense</h3>
                </div>
                <form className="p-4 " onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <div className="flex flex-col items-start">
                      <input
                        type="text"
                        className="block w-full mt-1 text-lg p-1 text-slate-900 border-gray-300 rounded-md border border-black-700 "
                        {...register('name')}
                      />
                      {errors.name && (
                        <p className="text-red-700 text-sm">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="flex flex-col items-start">
                      <input
                        type="text"
                        className="block w-full mt-1 text-lg p-1 text-slate-900 border-gray-300 rounded-md border border-black-700 "
                        {...register('description')}
                      />
                      {errors.description && (
                        <p className="text-red-700 text-sm">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>

                    <select
                      {...register('category')}
                      onChange={(e) =>
                        setValue('category', e.target.value, {
                          shouldValidate: true,
                        })
                      }
                      className="block w-full mt-1 text-xl p-1 text-slate-900 border-gray-300 rounded-md border border-black-700"
                    >
                      <option value="" className="capitalize text-lg">
                        Please Select an Option
                      </option>
                      {[
                        'health',
                        'electronics',
                        'travel',
                        'education',
                        'books',
                        'others',
                      ].map((value, index) => {
                        return (
                          <option
                            key={index}
                            value={value}
                            className="capitalize text-lg"
                          >
                            {value}
                          </option>
                        )
                      })}
                    </select>
                    {errors.category && (
                      <p className="text-red-700 text-sm">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Date Of Expense
                    </label>
                    <div className="flex flex-col items-start">
                      <input
                        type="date"
                        className="block w-full mt-1 text-lg p-1 text-slate-900 border-gray-300 rounded-md border border-black-700 "
                        {...register('date')}
                      />
                      {errors.date && (
                        <p className="text-red-700 text-sm">
                          {errors.date.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Expense Amount
                    </label>
                    <div className="flex flex-col items-start">
                      <input
                        type="number"
                        className="block w-full mt-1 text-lg p-1 text-slate-900 border-gray-300 rounded-md border border-black-700 "
                        {...register('amount')}
                      />
                      {errors.amount && (
                        <p className="text-red-700 text-sm">
                          {'Enter Positive Amount'}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Created By User Name
                    </label>
                    <div className="flex flex-col items-start">
                      <input
                        type="text"
                        className="block w-full mt-1 text-lg p-1 text-slate-900 border-gray-300 rounded-md border border-black-700 "
                        {...register('createdBy')}
                      />
                      {errors.createdBy && (
                        <p className="text-red-700 text-sm">
                          {errors.createdBy.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() =>
                        dispatch(
                          showModal({
                            type: 'createExpense',
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
                    >
                      Create Expense
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
export default CreateExpense
