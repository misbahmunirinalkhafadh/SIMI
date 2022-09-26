import React from 'react'
import { Link } from 'react-router-dom'

import { PeopleIcon } from '../../assets/icons'
import { InfoCard, RoundIcon } from '../../components'


function Login() {
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col justify-center py-10 overflow-y-auto md:flex-row">
          {/* <!-- Cards --> */}
          <ul className='grid w-full gap-6 md:grid-cols-2'>
            <li className='flex justify-center'>
              <Link to="/app">
                <InfoCard title="Login as" value="Technician >">
                  <RoundIcon
                    icon={PeopleIcon}
                    iconColorClass="text-orange-500 dark:text-orange-100"
                    bgColorClass="bg-orange-100 dark:bg-orange-500"
                    className="mr-6"
                  />
                </InfoCard>
              </Link>
            </li>
            <li className='flex justify-center'>
              <Link to="/app">
                <InfoCard title="Login as" value="User >">
                  <RoundIcon
                    icon={PeopleIcon}
                    iconColorClass="text-orange-500 dark:text-orange-100"
                    bgColorClass="bg-orange-100 dark:bg-orange-500"
                    className="mr-6"
                  />
                </InfoCard>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login
