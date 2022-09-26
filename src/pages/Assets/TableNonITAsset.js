import React, { useEffect, useState } from 'react'

import {
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

import response from '../../utils/demo/tableData'
import { Link } from 'react-router-dom'
// make a copy of the data, for the second table
const response2 = response.concat([])

function TableNonITAsset() {

    // setup pages control for every table
    const [pageTable2, setPageTable2] = useState(1)

    // setup data for every table
    const [dataTable2, setDataTable2] = useState([])

    const [textBlue, setTextBlue] = useState(false)

    // pagination setup
    const resultsPerPage = 10
    const totalResults = response.length

    // pagination change control
    function onPageChangeTable2(p) {
        setPageTable2(p)
    }

    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
        setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
    }, [pageTable2])

    return (
        <>
            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Asset Name</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Serial Number</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {dataTable2.map((user, i) => (
                            <TableRow className="dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" onMouseEnter={() => setTextBlue(true)} onMouseLeave={() => setTextBlue(false)} key={i}>
                                <TableCell>
                                    <Link className={textBlue === true ? 'text-blue-500' : ''} to='/'>Asset Name</Link>
                                </TableCell>
                                <TableCell>
                                    Model
                                </TableCell>
                                <TableCell>
                                    Serial Number
                                </TableCell>
                                <TableCell>
                                    <Badge type={user.status}>{user.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <Button layout="link" size="icon" aria-label="Edit">
                                            <EditIcon className="w-5 h-5" aria-hidden="true" color={textBlue === true ? '#7e3af2' : ''} />
                                        </Button>
                                        <Button layout="link" size="icon" aria-label="Delete">
                                            <TrashIcon className="w-5 h-5" aria-hidden="true" color={textBlue === true ? '#c81e1e' : ''} />
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
                        onChange={onPageChangeTable2}
                        label="Table navigation"
                    />
                </TableFooter>
            </TableContainer>
        </>
    )
}

export default TableNonITAsset