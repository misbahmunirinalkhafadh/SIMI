import React, { useEffect, useState } from 'react';
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableContainer,
    Avatar
} from '@windmill/react-ui'

import { SectionTitle } from '../../components/atoms';
import { deploymentsServices } from '../../services/deployments';
import useDataSite from '../../hooks/useDataSite';

function TabHistory({ serialNumber, hardware }) {
    const { allSite } = useDataSite({})
    const [historyDeploy, setHistoryDeploy] = useState([])
    const photoURL = "https://firebasestorage.googleapis.com/v0/b/simi-51185.appspot.com/o/blank-profile-picture.png?alt=media&token=edc1d1d5-df02-4922-892a-35d2c36a50d5"

    useEffect(() => {
        try {
            if (serialNumber) {
                deploymentsServices.getByArrayId(serialNumber).then(res => {
                    setHistoryDeploy(res.filter(e => e?.data?.statusDeploy === "Withdrawn"))
                })
            }
        } catch (error) {
            console.log(error);
        }
    }, [serialNumber])

    return (
        <>
            {/* User History */}
            <SectionTitle>History User</SectionTitle>
            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>User</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Site</TableCell>
                            <TableCell>Deploy Date</TableCell>
                            <TableCell>Withdraw Date</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {historyDeploy.map(({ data }, i) => (
                            <TableRow className="dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={i}>
                                <TableCell>
                                    <div className="flex items-center text-sm">
                                        <Avatar className="hidden mr-3 md:block" src={photoURL} alt="User avatar" />
                                        <div>
                                            <p className="font-semibold">{data.deployed.user}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{data.deployed.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{data.deployed.job}</TableCell>
                                <TableCell>{data.deployed.department ? data.deployed.department : '-'}</TableCell>
                                <TableCell>{allSite?.find((e) => e.id === data.site)?.data.name}</TableCell>
                                <TableCell>{new Date(data.createdAt?.seconds * 1000).toLocaleDateString("in-ID")}</TableCell>
                                <TableCell>{new Date(data.withdrawn?.withdrawnAt?.seconds * 1000).toLocaleDateString("in-ID")}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>

            {/* Hardware */}
            <SectionTitle>History Hardware</SectionTitle>
            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Item</TableCell>
                            <TableCell>Before</TableCell>
                            <TableCell>After</TableCell>
                            <TableCell>Modified Date</TableCell>
                            <TableCell>Modified By</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {hardware?.map((data, i) => (
                            <TableRow className="dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={i} >
                                <TableCell>{data.item}</TableCell>
                                <TableCell>{data.before}</TableCell>
                                <TableCell>{data.after}</TableCell>
                                <TableCell>{new Date(data.modifiedAt.seconds * 1000).toLocaleDateString("in-ID")}</TableCell>
                                <TableCell>{data.modifiedBy}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TabHistory