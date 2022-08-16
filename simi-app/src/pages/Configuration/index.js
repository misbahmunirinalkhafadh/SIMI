import React from 'react'

import { PageTitle } from '../../components/atoms'
import { Tabs } from './Tabs'

function Configuration({color}) {

  return (
    <>
      <PageTitle>Configuration</PageTitle>
      <Tabs color="purple" />
    </>
  )
}

export default Configuration
