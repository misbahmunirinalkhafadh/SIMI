import React, { useEffect, useState } from 'react'
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Button,
    Pagination,
    Badge
} from '@windmill/react-ui'

import useDataDeployment from '../../../hooks/useDataDeployment'
import { DownloadIcon, InformationIcon } from '../../../assets/icons'
import useDataSite from '../../../hooks/useDataSite'
import ModalDetail from '../ModalDetail'
import { BASTWithdrawal } from '../../../components/templates/BASTWithdrawal'

export default function TableWithdrawn({ filter }) {
    const { allDeployment } = useDataDeployment({})
    const { allSite } = useDataSite({})
    const [detail, setDetail] = useState({})
    const [response, setResponse] = useState([])

    // setup pages control for every table
    const [pageTable, setPageTable] = useState(1)

    // setup data for every table
    const [dataTable, setDataTable] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false)

    // pagination setup
    const resultsPerPage = 10

    // pagination change control
    function onPageChangeTable(p) {
        setPageTable(p)
    }

    function openModal(value) {
        setIsModalOpen(true)
        setDetail(value)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    useEffect(() => {
        let resultFilter = [];
        resultFilter.push(allDeployment?.filter((e) => {
            let deploy = e.data.isWithdrawn === true

            let search = filter.search !== "" ? e.data.serialNumber
                .toLowerCase()
                .search(filter.search.toLowerCase()) !== -1
                : true;

            let category = filter.category !== "all" ? e.data.category
                .toLowerCase()
                .search(filter.category.toLowerCase()) !== -1
                : true;

            return deploy && search && category
        }));
        setResponse(resultFilter[0])
    }, [allDeployment, filter])

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
                            <TableCell>Withdraw Date</TableCell>
                            <TableCell>Asset Site</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Serial Number</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell className="text-center">Status Deploy</TableCell>
                            <TableCell className="text-center">Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {dataTable.map(({ id, data }) => (
                            <TableRow className="dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={id}>
                                <TableCell>{new Date(data?.withdrawn?.withdrawnAt.seconds * 1000).toLocaleDateString("in-ID")}</TableCell>
                                <TableCell>
                                    {allSite?.filter((e) => e.id === data?.site)[0]?.data.name}
                                </TableCell>
                                <TableCell>{data?.category}</TableCell>
                                <TableCell>{data?.brand} {data?.model}</TableCell>
                                <TableCell>{data?.serialNumber}</TableCell>
                                <TableCell>{data?.deployed?.user}</TableCell>
                                <TableCell>{data?.deployed?.email}</TableCell>
                                <TableCell>{data?.deployed?.job}</TableCell>
                                <TableCell>{data?.deployed?.department ? data?.deployed?.department : '-'}</TableCell>
                                <TableCell className="text-center" ><Badge type="success">{data?.withdrawn?.status}</Badge></TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Button layout="link" size="icon" aria-label="Detail">
                                            <InformationIcon className="w-5 h-5" aria-hidden="true" color="#7e3af2" onClick={() => openModal(data)} />
                                        </Button>
                                        <Button layout="link" size="icon" aria-label="Download">
                                            <DownloadIcon className="w-5 h-5" aria-hidden="true" color="#7e3af2" onClick={() => BASTWithdrawal({ id, data, site: allSite?.filter((e) => e.id === data?.site)[0]?.data.name })} />
                                        </Button>
                                    </div>
                                </TableCell>
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
            <ModalDetail isModalOpen={isModalOpen} closeModal={closeModal} data={detail} isWithdrawn={detail.isWithdrawn} />
        </>
    )
}
