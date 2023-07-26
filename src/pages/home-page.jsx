import React, { useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/loading-spinner'

let emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
//schema to handle validation
const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, 'Invalid Email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
})
function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const [loginStatus, setLoginStaus] = useState(false)
  const navigate = useNavigate()

  const onSubmit = () => {
    setLoginStaus(true)
    const timer = setTimeout(() => navigate('/expense'), 3000)
    return () => clearTimeout(timer)
  }
  return (
    <>
      <div>
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
          <h1 className=" text-xl md:text-3xl text-[#01967b] capitalize">
            User Login
          </h1>
          <div className=" w-3/4 h-2/3 md:w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
            <form className="p-4 " onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="email"
                    className="block w-full mt-1 text-xl p-1 text-slate-900 border-gray-300 rounded-md border border-black-700 "
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-red-700 text-xl">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="password"
                    {...register('password')}
                    className="block w-full text-xl p-1   text-slate-700 mt-1 border-gray-300 rounded-md border border-black-700 "
                  />
                  {errors.password && (
                    <p className="text-red-700 text-xl">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center mt-4">
                <button
                  type="submit"
                  className="w-full  px-2 py-1 md:px-4 md:py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#01967b]  rounded-md hover:text-slate-900 cursor focus:outline-none focus:bg-purple-600"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="text-slate-700 text-center">
              {loginStatus && <LoadingSpinner></LoadingSpinner>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
