import React from 'react'
import { Modal, ModalHeader, ModalBody } from '@windmill/react-ui'
import useDataSite from '../../hooks/useDataSite';

function ModalDetailDeploy({ closeModal, isModalOpen, data }) {
    const { allSite } = useDataSite({})
    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>Deploy Information</ModalHeader>
                <ModalBody>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    User
                                </th>
                                <td className="px-6 py-2">
                                    {data.user}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Email Address
                                </th>
                                <td className="px-6 py-2">
                                    {data.email}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Department
                                </th>
                                <td className="px-6 py-2">
                                    {data.department}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Job Title
                                </th>
                                <td className="px-6 py-2">
                                    {data.job}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Site
                                </th>
                                <td className="px-6 py-2">
                                    {allSite?.filter((e) => e.id === data.site)[0]?.data.name}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Serial Number
                                </th>
                                <td className="px-6 py-2">
                                    {data.serialNumber}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Asset
                                </th>
                                <td className="px-6 py-2">
                                    {data.category} {data.brand} {data.model}
                                </td>
                            </tr>
                            {data.information ?
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                        Specification
                                    </th>
                                    <td className="px-6 py-2">
                                        {data.information?.operatingSystem}, {data.information?.processor}, {data.information?.ram} RAM, {data.information?.storageType} {data.information?.storageCapacity}
                                    </td>
                                </tr> : null
                            }
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Status Deploy
                                </th>
                                <td className="px-6 py-2">
                                    {data.statusDeploy}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Deploy Date
                                </th>
                                <td className="px-6 py-2">
                                    {new Date(data.createdAt?.seconds * 1000).toLocaleDateString("in-ID")}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Confirm Date
                                </th>
                                <td className="px-6 py-2">
                                    {new Date(data.confirmAt?.seconds * 1000).toLocaleDateString("in-ID")}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Withdraw Date
                                </th>
                                <td className="px-6 py-2">
                                    {data.withdrawalAt ? new Date(data.withdrawalAt?.seconds * 1000).toLocaleDateString("in-ID") : '-'}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Remark
                                </th>
                                <td className="px-6 py-2">
                                    {data.remark}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ModalDetailDeploy