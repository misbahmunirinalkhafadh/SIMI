import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import ImageLight from '../../assets/img/login-office.jpeg'
import ImageDark from '../../assets/img/login-office-dark.jpeg'
import { GoogleIcon } from '../../assets/icons'
import { Label, Input, Button } from '@windmill/react-ui'
import { useForm } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import { logInWithEmailAndPassword } from '../../services/auth'

function Login() {
  const { register, handleSubmit } = useForm()
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  const onSubmit = (value) => {
    logInWithEmailAndPassword(value)
  }

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace("/app");
  }, [user, loading, history]);

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Label>
                  <span>Email</span>
                  <Input className="mt-1" type="email" placeholder="user@email.com" {...register("email")} required />
                </Label>

                <Label className="mt-4">
                  <span>Password</span>
                  <Input className="mt-1" type="password" placeholder="***************" {...register("password")} required />
                </Label>

                <Button className="mt-4" block type="submit">
                  Log in
                </Button>
              </form>

              <hr className="my-8" />

              <Button block layout="outline">
                <GoogleIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Google
              </Button>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
