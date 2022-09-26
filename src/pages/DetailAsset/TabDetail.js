import React from 'react';

import { SectionTitle } from '../../components/atoms';

function TabDetail(data) {
    const { site, salesOrder, category, brand, model, serialNumber, visibility, status, statusDetail, description, information } = data.data;
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
                                    {site}
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
                            <tr className="border-b border-gray-200 dark:border-gray-700">
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
                                    {visibility}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Status
                                </th>
                                <td className="px-6 py-4">
                                    {status}
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
                                    -
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Email Address
                                </th>
                                <td className="px-6 py-4">
                                    -
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Username
                                </th>
                                <td className="px-6 py-4">
                                    -
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Employee ID
                                </th>
                                <td className="px-6 py-4">
                                    -
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Assign Date
                                </th>
                                <td className="px-6 py-4">
                                    -
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Job Title
                                </th>
                                <td className="px-6 py-4">
                                    -
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Site
                                </th>
                                <td className="px-6 py-4">
                                    -
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Department
                                </th>
                                <td className="px-6 py-4">
                                    -
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