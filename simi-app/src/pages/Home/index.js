import React from 'react';

import { PageTitle, SectionTitle } from '../../components/atoms';
import { Card, CardBody } from '@windmill/react-ui';

function Home() {
  return (
    <>
      <PageTitle>Home</PageTitle>
      
      <SectionTitle>My Task</SectionTitle>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Large, full width sections goes here
          </p>
        </CardBody>
      </Card>
    </>
  )
}

export default Home
