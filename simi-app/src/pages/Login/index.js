import React from 'react'
import { Button, Input } from '../../components';

function Login() {
  return (
    <div className="container px-6 mx-auto my-24">

      <section className="mb-32 text-center text-gray-800">
        <div className="max-w-[500px] mx-auto px-3 lg:px-6">
          <h2 className="mb-12 text-3xl font-bold">Login</h2>
          <form>
            <div className="mb-3 form-group">
              <Input type="text" id="emailAddress" placeholder="Email Address" />
            </div>
            <div className="mb-3 form-group">
              <Input type="password" id="password" placeholder="Password" />
            </div>
            <div className="mb-6 text-left form-group form-check">
              <Input type="checkbox" id="cbRememberMe" />
              <label className="inline-block text-gray-800 form-check-label" for="cbRememberMe">Remember Me</label>
            </div>
            <Button type="submit" name="Login" />
          </form>
        </div>
      </section>

    </div>
  );
}

export default Login