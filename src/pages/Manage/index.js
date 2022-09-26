import React from 'react'

import { PageTitle } from '../../components/atoms'
import { Tabs } from './Tabs'

function Manage({color}) {

  return (
    <>
      <PageTitle>Manage</PageTitle>
      <Tabs color="purple" />
    </>
  )
}

export default Manage
