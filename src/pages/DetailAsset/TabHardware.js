import React from 'react';
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableContainer,
} from '@windmill/react-ui'

import { SectionTitle } from '../../components/atoms';

function TabHardware(data) {
    return (
        <>
            <SectionTitle>Hardware Information</SectionTitle>

            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Processor</TableCell>
                            <TableCell>RAM</TableCell>
                            <TableCell>Storage</TableCell>
                            <TableCell>Capacity</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                            <TableCell>{data.data?.processor}</TableCell>
                            <TableCell>{data.data?.ram}</TableCell>
                            <TableCell>{data.data?.storageType}</TableCell>
                            <TableCell>{data.data?.storageCapacity}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TabHardware