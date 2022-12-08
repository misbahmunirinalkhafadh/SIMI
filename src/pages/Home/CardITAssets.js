import React, { useEffect, useState } from 'react'
import { Card, CardBody, Badge, Button } from '@windmill/react-ui'
import useDataSite from '../../hooks/useDataSite'
import useDataAsset from '../../hooks/useDataAsset'
import useDataUser from '../../hooks/useDataUser'
import { Timestamp } from 'firebase/firestore'
import Swal from 'sweetalert2'
import { deploymentsServices } from '../../services/deployments'
import { assetsServices } from '../../services/assets'
import { DownloadIcon } from '../../assets/icons'
import { BASTDeployment } from '../../components/templates/BASTDeployment'
import { BASTWithdrawal } from '../../components/templates/BASTWithdrawal'

export default function CardITAsset({ deployId, data }) {
    const { allSite } = useDataSite({})
    const { allAsset, allITAsset } = useDataAsset({})
    const { allUser, dataUser } = useDataUser([])
    const [asset, setAsset] = useState({})

    const { serialNumber, site, category, brand, model, statusDeploy, createdAt, createdBy, withdrawn, isDeployed, isWithdrawn, information, deployed } = data

    const handleConf = () => {
        Swal.fire({
            title: 'Do you want to confirm the assigment Asset?',
            icon: 'question',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Accept',
            denyButtonText: 'Reject'
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Accept assignment asset',
                    text: 'Please enter the reason for your choice',
                    icon: 'warning',
                    input: 'text',
                    showCancelButton: true,
                    confirmButtonText: 'Submit',
                }).then((result) => {
                    if (result.isConfirmed) {
                        const deployed = {
                            status: 'Accepted',
                            remark: result.value,
                            confirmAt: Timestamp.now(),
                            confirmBy: dataUser.email
                        }
                        const information = {
                            operatingSystem: asset?.operatingSystem,
                            processor: asset?.processor,
                            ram: asset?.ram,
                            storageCapacity: asset?.storageCapacity,
                            storageType: asset?.storageType
                        }
                        deploymentsServices.set(deployId, { isDeployed: true, deployed, information, statusDeploy: 'Deployed' })
                        const assetId = allITAsset.find(e => e.data.serialNumber === serialNumber).id
                        const userId = allUser.find(e => e.data?.deployed?.email === deployed.email).id
                        assetsServices.update(assetId, {
                            status: 'In Use',
                            deployed: {
                                uid: userId,
                                deployedAt: createdAt,
                                deployedBy: createdBy,
                                confirmAt: Timestamp.now(),
                                confirmBy: dataUser.email
                            }
                        })
                        Swal.fire('Accepted!', 'Your reason has been submitted.', 'success')
                            .then(() => window.location.reload())
                    }
                })
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Reject assignment asset',
                    text: 'Please enter the reason for your choice',
                    icon: 'warning',
                    input: 'text',
                    showCancelButton: true,
                    confirmButtonText: 'Submit',
                }).then((result) => {
                    if (result.isConfirmed) {
                        const deployed = {
                            status: 'Rejected',
                            remark: result.value,
                            confirmAt: Timestamp.now(),
                            confirmBy: dataUser.email
                        }
                        deploymentsServices.set(deployId, { deployed, statusDeploy: 'Rejected' })
                        Swal.fire('Rejected!', 'Your reason has been submitted.', 'success')
                            .then(() => window.location.reload())
                    }
                })
            }
        })
    }

    useEffect(() => {
        setAsset(allAsset.find(e => e.data.serialNumber === serialNumber)?.data?.information)
    }, [allAsset, serialNumber])

    return (
        <>
            <Card >
                <CardBody>
                    <h5 className="text-xl font-medium text-gray-500 dark:text-gray-400">{serialNumber}
                        {(() => {
                            switch (statusDeploy) {
                                case "Assigned":
                                    return <Badge className="float-right my-1" type="primary">{statusDeploy}</Badge>
                                case "Deployed":
                                    return <Badge className="float-right my-1" type="success">{statusDeploy}</Badge>
                                case "Rejected":
                                    return <Badge className="float-right my-1" type="danger">{statusDeploy}</Badge>
                                case "Withdrawn":
                                    return <Badge className="float-right my-1" type="neutral">{statusDeploy}</Badge>
                                default:
                                    return <Badge className="float-right my-1" type="neutral">{statusDeploy}</Badge>
                            }
                        })()}
                    </h5>
                    <div className="grid col-gap-3 my-3 sm:grid-cols-2">
                        <small className='text-gray-600'>Deployed: {new Date(createdAt?.seconds * 1000).toLocaleDateString("in-ID")}</small>
                        <small className='text-gray-600'>Withdrawal: {withdrawn ? new Date(withdrawn?.withdrawnAt?.seconds * 1000).toLocaleDateString("in-ID") : '-'}</small>
                    </div>
                    <ul className="space-y-5 my-7">
                        <li className="flex space-x-3">
                            <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{allSite?.filter((e) => e.id === site)[0]?.data.name}</span>
                        </li>
                        <li className="flex space-x-3">
                            <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{category} {brand} {model}</span>
                        </li>
                        <li className="flex space-x-3">
                            <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{information ? information?.operatingSystem : asset?.operatingSystem}</span>
                        </li>
                        <li className="flex space-x-3">
                            <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{information ? information?.processor : asset?.processor}</span>
                        </li>
                        <li className="flex space-x-3">
                            <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{information ? information?.ram : asset?.ram} RAM</span>
                        </li>
                        <li className="flex space-x-3">
                            <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{information ? information?.storageType : asset?.storageType} {information ? information.storageCapacity : asset?.storageCapacity} Memory storage</span>
                        </li>
                    </ul>
                    <div className="pt-5 pb-3">
                        <div hidden={!isDeployed || isWithdrawn}>
                            <Button className="mb-2" block layout="outline" type="submit" >Report Issue</Button>
                        </div>
                        <div hidden={isDeployed} >
                            <Button block onClick={handleConf} hidden={true} disabled={deployed?.status === 'Rejected' ? true : false} >{deployed?.status === 'Rejected' ? 'On Request' : 'Confirmation'}</Button>
                        </div>
                        <div hidden={!isDeployed} >
                            <Button block type="submit" iconLeft={DownloadIcon} onClick={() => BASTDeployment({ id: deployId, data, site: allSite?.filter((e) => e.id === data?.site)[0]?.data.name })}>
                                BAST Deployment
                            </Button>
                        </div>
                        <div hidden={!isWithdrawn} >
                            <Button block type="submit" className="mt-2" iconLeft={DownloadIcon} onClick={() => BASTWithdrawal({ id: deployId, data, site: allSite?.filter((e) => e.id === data?.site)[0]?.data.name })}>
                                BAST Withdrawal
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}
