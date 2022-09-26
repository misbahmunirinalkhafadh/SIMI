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

function TabHistory() {
    return (
        <>
            {/* User History */}
            <SectionTitle>History User</SectionTitle>
            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>User</TableCell>
                            <TableCell>Site</TableCell>
                            <TableCell>SO Number</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Serial Number</TableCell>
                            <TableCell>Loan</TableCell>
                            <TableCell>Withdraw</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Hardware */}
            <SectionTitle>History Hardware</SectionTitle>
            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Processor</TableCell>
                            <TableCell>RAM</TableCell>
                            <TableCell>Storage</TableCell>
                            <TableCell>Capacity</TableCell>
                            <TableCell>Modified Date</TableCell>
                            <TableCell>Modified By</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TabHistory