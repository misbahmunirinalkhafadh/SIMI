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

import { EditIcon, TrashIcon } from '../../assets/icons'
import Swal from 'sweetalert2'
import ModalFormDeploy from './ModalFormDeploy'
import useDataDeployment from '../../hooks/useDataDeployment'
import useDataSite from '../../hooks/useDataSite'
import { deploymentsServices } from '../../services/deployments'
import useDataUser from '../../hooks/useDataUser'
import { assetsServices } from '../../services/assets'
import useDataAsset from '../../hooks/useDataAsset'

export default function TablePending({ filter }) {
    const { allDeployment } = useDataDeployment({})
    // const { allSite } = useDataSite({})
    const { allAsset } = useDataAsset({})
    const { role } = useDataUser();
    const [response, setResponse] = useState([])
    const [dataDeploy, setDataDeploy] = useState({})

    // setup pages control for every table
    const [pageTable, setPageTable] = useState(1)

    // setup data for every table
    const [dataTable, setDataTable] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    const priviledges = role?.priviledges?.filter(e => e.permission === "Deployments")[0];

    // pagination setup
    const resultsPerPage = 10

    // pagination change control
    function onPageChangeTable(p) {
        setPageTable(p)
    }

    function openModal({ id, data }) {
        setIsModalOpen(true)
        setDataDeploy({ id, data })
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    const handleDelete = ({ id, data }) => {
        let assetId = allAsset.filter(e => e.data.serialNumber === data.serialNumber)[0].id
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deploymentsServices.delete(id)
                    assetsServices.update(assetId, { status: "Ready" })
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success',
                    ).then(() => window.location.reload())
                }
            })
        } catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        let resultFilter = [];
        resultFilter.push(allDeployment?.filter((e) => {
            let deploy = e.data.isDeployed === false

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
                            {/* <TableCell>Asset Site</TableCell> */}
                            <TableCell>Category</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Serial Number</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell className="text-center">Status Deploy</TableCell>
                            <TableCell className="text-center">Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {dataTable.map(({ id, data }) => (
                            <TableRow className="dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={id}>
                                {/* <TableCell>
                                    {allSite?.filter((e) => e.id === data?.site)[0]?.data.name}
                                </TableCell> */}
                                <TableCell>{data?.category}</TableCell>
                                <TableCell>{data?.brand} {data?.model}</TableCell>
                                <TableCell>{data?.serialNumber}</TableCell>
                                <TableCell>{data?.user}</TableCell>
                                <TableCell>{data?.email}</TableCell>
                                <TableCell>{data?.job}</TableCell>
                                <TableCell className="text-center" ><Badge type="warning">{data?.statusDeploy}</Badge></TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Button layout="link" size="icon" aria-label="Edit" disabled={!priviledges?.edit} onClick={() => openModal({ id, data })}>
                                            <EditIcon className="w-5 h-5" aria-hidden="true" color="#7e3af2" />
                                        </Button>
                                        <Button layout="link" size="icon" aria-label="Delete" disabled={!priviledges?.delete} onClick={() => handleDelete({ id, data })}>
                                            <TrashIcon className="w-5 h-5" aria-hidden="true" color='#c81e1e' />
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
            <ModalFormDeploy isModalOpen={isModalOpen} closeModal={closeModal} deployId={dataDeploy.id} data={dataDeploy.data} />
        </>
    )
}
