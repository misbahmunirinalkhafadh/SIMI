import React from 'react';

import { PageTitle, SectionTitle } from '../../components/atoms';
import { Card, CardBody } from '@windmill/react-ui';

function Home() {
  return (
    <>
      <PageTitle>Home</PageTitle>

      {/* <SectionTitle>My Task</SectionTitle>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Large, full width sections goes here
          </p>
        </CardBody>
      </Card> */}

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card>
          <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">My Request Summary</p>
            <p className="text-gray-600 dark:text-gray-400">
              Coming soon...
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">My Assets</p>
            <div className="border-t border-gray-200">
              <p className="text-gray-600 dark:text-gray-400">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, cum commodi a omnis
                numquam quod? Totam exercitationem quos hic ipsam at qui cum numquam, sed amet
                ratione! Ratione, nihil dolorum.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Applicant Information</h3>
          <p className="max-w-2xl mt-1 text-sm text-gray-500">Personal details and application.</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Margot Foster</dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Application for</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Backend Developer</dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">$120,000</dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
              </dd>
            </div>
          </dl>
        </div>
      </Card>
    </>
  )
}

export default Home
