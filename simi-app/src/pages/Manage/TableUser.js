import React, { useEffect, useState } from 'react'

import {
    Avatar,
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Badge,
    Button,
    Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../assets/icons'

import { usersServices } from '../../services/users';
// make a copy of the data, for the second table

function TableUser() {

    // setup pages control for every table
    const [pageTable, setPageTable] = useState(1)

    // setup data for every table
    const [dataTable, setDataTable] = useState([])

    const [dataId, setDataId] = useState(null)

    // pagination setup
    const resultsPerPage = 10
    const totalResults = dataTable.length

    // pagination change control
    function onPageChangeTable(p) {
        setPageTable(p)
    }

    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
        // setDataTable(response.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
        try {
            usersServices.getAll().then(data => {
                const response = data.concat([])
                setDataTable(data, response.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
            })
        } catch (error) {
            console.log(error)
        }
    }, [pageTable])
    return (
        <>
            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>User</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {dataTable.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center text-sm">
                                        <Avatar className="hidden mr-3 md:block" src={user.data.avatar} alt="User avatar" />
                                        <div>
                                            <p className="font-semibold">{user.data.fullName}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{user.data.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {user.data.username}
                                </TableCell>
                                <TableCell>
                                    {user.data.role}
                                </TableCell>
                                <TableCell>
                                    <Badge type="success">{user.data.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <Button layout="link" size="icon" aria-label="Edit">
                                            <EditIcon className="w-5 h-5" aria-hidden="true" />
                                        </Button>
                                        <Button layout="link" size="icon" aria-label="Delete" onClick={() => usersServices.delete(user.id)}>
                                            <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TableFooter>
                    <Pagination
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                        onChange={onPageChangeTable}
                        label="Table navigation"
                    />
                </TableFooter>
            </TableContainer>
        </>
    )
}

export default TableUser