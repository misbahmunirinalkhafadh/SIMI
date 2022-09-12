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
import { ArchiveIcon, EditIcon, TrashIcon } from '../../assets/icons'

import response from '../../utils/demo/tableData'
import { Link } from 'react-router-dom'
import { assetsServices } from '../../services/assets'
// make a copy of the data, for the second table
// const response2 = response.concat([])

function TableNonITAsset({archive}) {

    // setup pages control for every table
    const [pageTable, setPageTable] = useState(1)

    // setup data for every table
    const [dataTable, setDataTable] = useState([])

    const [textBlue, setTextBlue] = useState(false)

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
        try {
            assetsServices.getAllNonITAsset().then(data => {
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
                            <TableCell>Asset ID</TableCell>
                            <TableCell>Asset Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Serial Number</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {dataTable.map((asset) => (
                            <TableRow className="dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" onMouseEnter={() => setTextBlue(true)} onMouseLeave={() => setTextBlue(false)} key={asset.id}>
                                <TableCell>
                                    {asset.data.assetId}
                                </TableCell>
                                <TableCell>
                                    <Link className={textBlue === true ? 'text-blue-500' : ''} to='/app/assets/detail'>{asset.data.assetName}</Link>
                                </TableCell>
                                <TableCell>
                                    {asset.data.category}
                                </TableCell>
                                <TableCell>
                                    {asset.data.type}
                                </TableCell>
                                <TableCell>
                                    {asset.data.serialNumber}
                                </TableCell>
                                <TableCell>
                                    <Badge type='success'>{asset.data.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <Button layout="link" size="icon" aria-label="Edit">
                                            <EditIcon className="w-5 h-5" aria-hidden="true" color={textBlue === true ? '#7e3af2' : ''} />
                                        </Button>
                                        {archive === 'archived' ?
                                            (<Button layout="link" size="icon" aria-label="Delete">
                                                <TrashIcon className="w-5 h-5" aria-hidden="true" color={textBlue === true ? '#c81e1e' : ''} />
                                            </Button>)
                                            :
                                            (<Button layout="link" size="icon" aria-label="Delete" >
                                                <ArchiveIcon className="w-5 h-5" aria-hidden="true" color={textBlue === true ? '#7e3af2' : ''} />
                                            </Button>)
                                        }
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

export default TableNonITAsset