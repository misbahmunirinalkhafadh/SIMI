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
import ModalFormRequest from './ModalFormRequest'
import { EditIcon, TrashIcon } from '../../assets/icons'
import Swal from 'sweetalert2'
import { requestsServices } from '../../services/requests'
import { Link } from 'react-router-dom'

export default function TableCompleted() {
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

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    const handleDelete = (id) => {
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
                    // assetsServices.delete(id)
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
        try {
            requestsServices.getAll().then(data => {
                setResponse(data)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])

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
                            <TableCell>Asset Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Serial Number</TableCell>
                            <TableCell className="text-center">Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {dataTable.map((req) => (
                            <TableRow className="dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={req?.id}>
                                <TableCell>
                                    <Link className="text-blue-500" to='/app/assets/detail'>{req?.data.assetName}</Link>
                                </TableCell>
                                <TableCell>
                                    {req?.data.category}
                                </TableCell>
                                <TableCell>
                                    {req?.data.type}
                                </TableCell>
                                <TableCell>
                                    {req?.data.serialNumber}
                                </TableCell>
                                <TableCell className="text-center" >
                                    <Badge type={req?.data.status === 'Standby' ? 'success' : 'primary'}></Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <Button layout="link" size="icon" aria-label="Edit" onClick={() => openModal()}>
                                            <EditIcon className="w-5 h-5" aria-hidden="true" color="#7e3af2" />
                                        </Button>
                                        <Button layout="link" size="icon" aria-label="Delete" onClick={() => handleDelete()}>
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
            <ModalFormRequest isModalOpen={isModalOpen} closeModal={closeModal} />
        </>
    )
}
