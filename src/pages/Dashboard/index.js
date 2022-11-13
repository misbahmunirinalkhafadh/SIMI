import React, { useEffect, useState } from 'react'
import { Doughnut, Line } from 'react-chartjs-2'
import { ChartCard, ChartLegend, InfoCard, PageTitle, RoundIcon } from '../../components'
import { CartIcon, PeopleIcon, FormsIcon } from '../../assets/icons'

import {
  lineOptions,
  lineLegends,
} from '../../utils/demo/chartsData'
import useDataAsset from '../../hooks/useDataAsset'
import useDataUser from '../../hooks/useDataUser'
import useDataDeployment from '../../hooks/useDataDeployment'

function Dashboard() {
  const { allAsset, allITAsset } = useDataAsset()
  const { allUser } = useDataUser()
  const { allDeployment } = useDataDeployment()
  const [ITAsset, setITAsset] = useState([])

  const doughnutLegends = [
    { title: 'In Use', color: 'bg-blue-500' },
    { title: 'Assigned', color: 'bg-teal-600' },
    { title: 'Ready', color: 'bg-purple-600' },
  ]
  const doughnutOptions = {
    data: {
      datasets: [
        {
          data: [33, 33, 33],
          backgroundColor: ['#0694a2', '#1c64f2', '#7e3af2'],
          label: 'Dataset 1',
        },
      ],
      labels: ITAsset,
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: false,
    },
  }

  useEffect(() => {
    const uniqueStatus = [];

    allITAsset.forEach((sts) => {
      if (uniqueStatus.indexOf(sts.data.status) === -1) {
        uniqueStatus.push(sts.data.status);
      }
    });
    setITAsset(uniqueStatus);
  }, [allITAsset]);

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