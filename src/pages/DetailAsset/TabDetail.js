import React, { useEffect, useState } from 'react';
import { Badge } from '@windmill/react-ui';

import { SectionTitle } from '../../components/atoms';
import { usersServices } from '../../services/users';
import useDataSite from '../../hooks/useDataSite';

function TabDetail({data}) {
    const { allSite } = useDataSite()
    const [currentUser, setCurrentUser] = useState({})
    const { site, salesOrder, category, brand, model, serialNumber, isArchived, status, statusDetail, description, createdAt, information, deployed } = data;

    useEffect(() => {
        if (deployed) {
            try {
                usersServices.getById(deployed?.uid).then(data => {
                    setCurrentUser(data);
                })
            } catch (error) {
                console.log(error);
            }
        }
    }, [deployed])

    return (
        <>
            <div className="grid col-gap-6 lg:grid-cols-2">
                {/* Asset Detail */}
                <div className="relative overflow-x-auto">
                    <SectionTitle>Asset Information</SectionTitle>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Site
                                </th>
                                <td className="px-6 py-4">
                                    {allSite?.find((e) => e.id === site)?.data.name}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    SO Number
                                </th>
                                <td className="px-6 py-4">
                                    {salesOrder}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Category
                                </th>
                                <td className="px-6 py-4">
                                    {category}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Brand
                                </th>
                                <td className="px-6 py-4">
                                    {brand}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Model
                                </th>
                                <td className="px-6 py-4">
                                    {model}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700" hidden={!information?.operatingSystem ? true : false}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Operating System
                                </th>
                                <td className="px-6 py-4">
                                    {information?.operatingSystem}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Serial Number
                                </th>
                                <td className="px-6 py-4">
                                    {serialNumber}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Visibility
                                </th>
                                <td className="px-6 py-4">
                                    {isArchived ? 'Archived' : 'Unarchived'}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Status
                                </th>
                                <td className="px-6 py-4">
                                    {(() => {
                                        switch (status) {
                                            case "In Use":
                                                return <Badge type="primary">{status}</Badge>
                                            case "Broken":
                                                return <Badge type="danger">{status}</Badge>
                                            case "Ready":
                                                return <Badge type="success">{status}</Badge>
                                            case "On Service":
                                                return <Badge type="neutral">{status}</Badge>
                                            default:
                                                return <Badge type="warning">{status}</Badge>
                                        }
                                    })()}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Status Detail
                                </th>
                                <td className="px-6 py-4">
                                    {!statusDetail ? '-' : statusDetail}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Create Date
                                </th>
                                <td className="px-6 py-4">
                                    {new Date(createdAt?.seconds * 1000).toLocaleDateString("in-ID")}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Description
                                </th>
                                <td className="px-6 py-4">
                                    {!description ? '-' : description}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* User */}
                <div className="relative overflow-x-auto">
                    <SectionTitle>User Information</SectionTitle>

                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Full Name
                                </th>
                                <td className="px-6 py-4">
                                    {!currentUser.displayName ? '-' : currentUser.displayName}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Email Address
                                </th>
                                <td className="px-6 py-4">
                                    {!currentUser.email ? '-' : currentUser.email}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Username
                                </th>
                                <td className="px-6 py-4">
                                    {!currentUser.username ? '-' : currentUser.username}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Employee ID
                                </th>
                                <td className="px-6 py-4">
                                    {!currentUser.employeeId ? '-' : currentUser.employeeId}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Job Title
                                </th>
                                <td className="px-6 py-4">
                                    {!currentUser.job ? '-' : currentUser.job}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Site
                                </th>
                                <td className="px-6 py-4">
                                    {!currentUser.site ? '-' : currentUser.site}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Department
                                </th>
                                <td className="px-6 py-4">
                                    {!currentUser.department ? '-' : currentUser.department}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default TabDetail