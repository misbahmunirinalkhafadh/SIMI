import React from 'react'
import { Doughnut, Line } from 'react-chartjs-2'
import { ChartCard, ChartLegend, InfoCard, PageTitle, RoundIcon } from '../../components'
import { CartIcon, PeopleIcon, FormsIcon } from '../../assets/icons'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../../utils/demo/chartsData'
import useDataAsset from '../../hooks/useDataAsset'
import useDataUser from '../../hooks/useDataUser'
import useDataDeployment from '../../hooks/useDataDeployment'

function Dashboard() {
  const { allAsset } = useDataAsset()
  const { allUser } = useDataUser()
  const { allDeployment } = useDataDeployment()

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total users" value={allUser.length}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total assets" value={allAsset.length}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending deploy" value={allDeployment.filter(e => e.data.isDeployed === false).length}>
          <RoundIcon
            icon={FormsIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Asset deployed" value={allDeployment.filter(e => e.data.isDeployed === true).length}>
          <RoundIcon
            icon={FormsIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>
    </>
  )
}

export default Dashboard
