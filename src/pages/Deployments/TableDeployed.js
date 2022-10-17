import React, { useEffect, useState } from 'react'
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Pagination,
    Badge
} from '@windmill/react-ui'
import useDataDeployment from '../../hooks/useDataDeployment'
import useDataSite from '../../hooks/useDataSite'

export default function TableDeployed() {
    const { allDeployment } = useDataDeployment({})
    const { allSite } = useDataSite({})

    const [response, setResponse] = useState([])

    // setup pages control for every table
    const [pageTable, setPageTable] = useState(1)

    // setup data for every table
    const [dataTable, setDataTable] = useState([])

    // pagination setup
    const resultsPerPage = 10

    // pagination change control
    function onPageChangeTable(p) {
        setPageTable(p)
    }

    useEffect(() => {
        setResponse(allDeployment?.filter(e => e.data.isDeployed === true))
    }, [allDeployment])

    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
        setDataTable(response.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
    }, [response, pageTable])

    return (
        <>
            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Asset Site</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Serial Number</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Job Title</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {dataTable.map(({ id, data }) => (
                            <TableRow className="dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={id}>
                                <TableCell>
                                    {allSite?.filter((e) => e.id === data.assetSite)[0]?.data.name}
                                </TableCell>
                                <TableCell>{data.category}</TableCell>
                                <TableCell>{data.brand} {data.model}</TableCell>
                                <TableCell>{data.serialNumber}</TableCell>
                                <TableCell>{data.user}</TableCell>
                                <TableCell>{data.email}</TableCell>
                                <TableCell>{data.job}</TableCell>
                                <TableCell className="text-center" ><Badge type="primary">{data.statusDeploy}</Badge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TableFooter>
                    {response?.length !== 0 && (
                        <Pagination
                            totalResults={response.length}
                            resultsPerPage={resultsPerPage}
                            onChange={onPageChangeTable}
                            label="Table navigation"
                        />
                    )}
                </TableFooter>
            </TableContainer>
        </>
    )
}
