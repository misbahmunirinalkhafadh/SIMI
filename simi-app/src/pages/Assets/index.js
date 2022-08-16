import React from 'react'

import { PageTitle } from '../../components/atoms'
import { Tabs } from './Tabs'

function Assets({color}) {

  return (
    <>
      <PageTitle>Assets</PageTitle>
      <Tabs color="purple" />
    </>
  )
}

export default Assets
