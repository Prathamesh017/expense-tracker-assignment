import { createSlice } from '@reduxjs/toolkit'
import { formatDate } from '../../utils/utils'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  expenses: [],
  expenseTableTitles: [
    'Name',
    'Description',
    'Category',
    'Date Of Expense',
    'Amount',
    'Updated At',
    'Created By',
    'Options',
  ],
  showModals: {
    createExpense: false,
    updateExpense: false,
    deleteExpense: false,
  },
  selectedExpenseId: null,
  sortByDate: null,
  sortByName: null,
}

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    showModal: (state, action) => {
      return {
        ...state,
        showModals: {
          ...state,
          [action.payload.type]: action.payload.isOpen,
        },
      }
    },
    setExpenseId: (state, action) => {
      return {
        ...state,
        selectedExpenseId: action.payload.id,
      }
    },
    setSortDate: (state, action) => {
      return {
        ...state,
        sortByDate: action.payload,
      }
    },
    setSortName: (state, action) => {
      return {
        ...state,
        sortByName: action.payload,
      }
    },

    addExpense: (state, action) => {
      let currentDate = new Date(Date.now())

      const uuid = uuidv4()
      const newExpense = {
        id: uuid,
        name: action.payload.name,
        description: action.payload.description,
        category: action.payload.category,
        date: action.payload.date,
        amount: action.payload.amount,
        updatedAt:
          formatDate(new Date(currentDate)) +
          ',' +
          currentDate.getHours() +
          ':' +
          currentDate.getMinutes(),
        createdBy: action.payload.createdBy,
      }
      setLocalStorage([...state.expenses, newExpense])
      return {
        ...state,
        expenses: [...state.expenses, newExpense],
      }
    },

    deleteExpense: (state, action) => {
      let updatedExpense = state.expenses.filter((expense) => {
        return expense.id !== state.selectedExpenseId
      })
      setLocalStorage(updateExpense)
      return {
        ...state,
        expenses: updatedExpense,
      }
    },
    updateExpense: (state, action) => {
      let currentDate = new Date(Date.now())
      let expenseIndex = state.expenses.findIndex((expense) => {
        return expense.id === state.selectedExpenseId
      })

      //index not found
      if (expenseIndex === -1) {
        return state
      }
      const existingExpenses = [...state.expenses]
      existingExpenses[expenseIndex] = {
        id: state.selectedExpenseId,
        name: action.payload.name,
        description: action.payload.description,
        category: action.payload.category,
        date: action.payload.date,
        amount: action.payload.amount,
        updatedAt:
          formatDate(new Date(currentDate)) +
          ',' +
          currentDate.getHours() +
          ':' +
          currentDate.getMinutes(),
        createdBy: action.payload.createdBy,
      }

      setLocalStorage(existingExpenses)
      return {
        ...state,
        expenses: existingExpenses,
      }
    },

    reset: (state, action) => {
      return {
        ...state,
        expenses: [],
        showModals: {
          createExpense: false,
          updateExpense: false,
          deleteExpense: false,
        },
        selectedExpenseId: null,
        sortByDate: null,
        sortByName: null,
      }
    },
  },
})

export const setLocalStorage = (data) => {
  localStorage.setItem('expenseData', JSON.stringify(data))
}

// Action creators are generated for each case reducer function
export const {
  showModal,
  setExpenseId,
  addExpense,
  deleteExpense,
  updateExpense,
  setSortDate,
  setSortName,
  reset,
} = expenseSlice.actions

export default expenseSlice.reducer
