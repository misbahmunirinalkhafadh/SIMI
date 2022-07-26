import React, { useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { Input, Label, Button } from '@windmill/react-ui'

import ImageLight from '../../assets/img/create-account-office.jpeg'
import ImageDark from '../../assets/img/create-account-office-dark.jpeg'
import { GoogleIcon } from '../../assets/icons'
import { auth } from '../../utils/firebase'
import { registerWithEmailAndPassword } from '../../services/auth'

function Login() {
  const { register, handleSubmit, watch } = useForm({});
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (value) => {
    const data = {
      displayName: value.displayName,
      email: value.email,
      password: value.password,
    }
    registerWithEmailAndPassword(data)

  }

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/app");
  }, [loading, user, history]);

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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <form onSubmit={e => e.preventDefault()}>
                <Label>
                  <span>Full Name</span>
                  <Input className="mt-1" placeholder="Type here..." {...register("displayName")} required />
                </Label>
                <Label className="mt-4">
                  <span>Email</span>
                  <Input className="mt-1" type="email" placeholder="user@email.com" {...register("email")} required />
                </Label>
                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    className="mt-1"
                    placeholder="***************"
                    type="password"
                    {...register("password", {
                      required: "You must specify a password",
                      minLength: {
                        value: 6,
                        message: "Password must have at least 6 characters"
                      }
                    })}
                  />
                  {/* {errors.password && <p>{errors.password.message}</p>} */}
                </Label>

                <Label className="mt-4">
                  <span>Confirm password</span>
                  <Input
                    className="mt-1"
                    placeholder="***************"
                    type="password"
                    {...register("confPassword", {
                      required: "You must specify a password",
                      validate: value =>
                        value === password.current || "The passwords do not match"
                    })}
                  />
                  {/* {errors.password_repeat && <p>{errors.confPassword.message}</p>} */}

                </Label>

                <Label className="mt-6" check>
                  <Input type="checkbox" />
                  <span className="ml-2">
                    I agree to the <span className="underline">privacy policy</span>
                  </span>
                </Label>

                <Button type="submit" block className="mt-4" onClick={handleSubmit(onSubmit)} >
                  Create account
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
                  to="/login"
                >
                  Already have an account? Login
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
