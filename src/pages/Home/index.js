import React, { useEffect, useState } from 'react';
import { Card, CardBody } from '@windmill/react-ui';

import { PageTitle, SectionTitle } from '../../components/atoms';
import useDataUser from '../../hooks/useDataUser';
import useDataDeployment from '../../hooks/useDataDeployment';
import CardITAsset from './CardITAssets';
import CardNonITAsset from './CardNonITAssets';

function Home() {
  const { dataUser } = useDataUser()
  const { allDeployment } = useDataDeployment({})
  const [resITAsset, setResITAsset] = useState([])
  const [resNonITAsset, setResNonITAsset] = useState([])

  useEffect(() => {
    const dataAsset = allDeployment?.filter(e => e?.data?.deployed?.email === dataUser.email)
    setResITAsset(dataAsset?.filter(e => e?.data?.category === 'Laptop' || e?.data?.category === 'Desktop'))
    setResNonITAsset(dataAsset?.filter(e => e?.data?.category === 'Printer' || e?.data?.category === 'Projector'))
  }, [allDeployment, dataUser])

  return (
    <>
      <PageTitle>Home</PageTitle>

      <div className="grid gap-4 mb-8 md:grid-cols-3">
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
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Issues and Resolution</p>
            <p className="text-gray-600 dark:text-gray-400">
              Coming soon...
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Announcements</p>
            <p className="text-gray-600 dark:text-gray-400">
              Coming soon...
            </p>
          </CardBody>
        </Card>
      </div>

      {/* My Assets */}
      {resITAsset.length > 0 ?
        <>
          <SectionTitle>My IT Asset</SectionTitle>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {resITAsset.map(({ id, data }) => (
              <CardITAsset key={id} deployId={id} data={data} />
            ))}
          </div>
        </> : ''
      }

      {resNonITAsset.length > 0 ?
        <>
          <SectionTitle>My Non IT Asset</SectionTitle>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {resNonITAsset.map(({ id, data }) => (
              <CardNonITAsset key={id} deployId={id} data={data} />
            ))}
          </div>
        </> : ''
      }
    </>
  )
}

export default Home
