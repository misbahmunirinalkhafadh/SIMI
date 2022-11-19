import React, { useEffect, useState } from 'react'
import { Doughnut, Line, Pie } from 'react-chartjs-2'
import { Card, CardBody, Select } from '@windmill/react-ui'
import { ChartLegend, InfoCard, PageTitle, RoundIcon } from '../../components'
import { CartIcon, PeopleIcon, FormsIcon } from '../../assets/icons'

import useDataAsset from '../../hooks/useDataAsset'
import useDataUser from '../../hooks/useDataUser'
import useDataDeployment from '../../hooks/useDataDeployment'

function Dashboard() {
  const { allAsset } = useDataAsset()
  const { allUser } = useDataUser()
  const { allDeployment } = useDataDeployment()
  const [assetData, setAssetData] = useState([])
  const [assetCategory, setAssetCategory] = useState([])

  const doughnutLegends = [
    { title: 'In Use', color: 'bg-purple-500' },
    { title: 'Assigned', color: 'bg-orange-500' },
    { title: 'Ready', color: 'bg-green-500' },
  ]

  const dataITAsset = {
    data: {
      datasets: [
        {
          data: assetData,
          backgroundColor: ['#9061f9', '#ff5a1f', '#0e9f6e'],
          label: 'Dataset 1',
        },
      ],
      labels: ['In Use', 'Assigned', 'Ready'],
    },
    options: {
      responsive: true,
      cutoutPercentage: 0,
    },
    legend: {
      display: false,
    },
  }

  const handleChange = (e) => {
    if (e.target.value === "all") {
      setAssetData([
        allAsset.filter(e => e.data.status === 'In Use').length,
        allAsset.filter(e => e.data.status === 'Assigned').length,
        allAsset.filter(e => e.data.status === 'Ready').length
      ])
    } else {
      setAssetData([
        allAsset.filter(el => el.data.status === 'In Use' && el?.data?.category === e.target.value).length,
        allAsset.filter(el => el.data.status === 'Assigned' && el?.data?.category === e.target.value).length,
        allAsset.filter(el => el.data.status === 'Ready' && el?.data?.category === e.target.value).length
      ])
    }
  }

  useEffect(() => {
    setAssetData([
      allAsset.filter(e => e.data.status === 'In Use').length,
      allAsset.filter(e => e.data.status === 'Assigned').length,
      allAsset.filter(e => e.data.status === 'Ready').length
    ])
    const uniqueTags = [];
    allAsset.forEach((asd) => {
      if (uniqueTags.indexOf(asd.data.category) === -1) {
        uniqueTags.push(asd.data.category);
      }
    });
    setAssetCategory(uniqueTags)
  }, [allAsset]);

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
        <Card>
          <CardBody>
            <div className="grid gap-6 mb-8 md:grid-cols-2">
              <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Asset Category By Status</p>
              <Select onChange={handleChange}>
                <option value="all" >All Asset</option>
                {assetCategory.sort().map((data, i) => (
                  <option value={data} key={i}>
                    {data}
                  </option>
                ))}
              </Select>
            </div>
            <Pie {...dataITAsset} />
            <ChartLegend legends={doughnutLegends} />
          </CardBody>
        </Card>

        {/* <ChartCard title="Non-IT Asset">
          <Line {...dataITAsset} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard> */}
      </div>
    </>
  )
}

export default Dashboard