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
import { EditIcon, InformationIcon, TrashIcon } from '../../assets/icons'

import { usersServices } from '../../services/users';
import ModalFormUser from './ModalFormUser';
import Swal from 'sweetalert2';
import ModalDetailUser from './ModalDetailUser';
// make a copy of the data, for the second table

function TableUser() {
    const [response, setResponse] = useState([])

    // setup pages control for every table
    const [pageTable, setPageTable] = useState(1)

    // setup data for every table
    const [dataTable, setDataTable] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)

    const [userId, setUserId] = useState(null)
    const [userData, setUserData] = useState({})

    // pagination setup
    const resultsPerPage = 10

    // pagination change control
    function onPageChangeTable(p) {
        setPageTable(p)
    }

    function openModal(value) {
        setIsModalOpen(true)
        setUserId(value.id)
        setUserData(value.data)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    function openModalDetail(value) {
        setIsModalDetailOpen(true)
        setUserData(value)
    }

    function closeModalDetail() {
        setIsModalDetailOpen(false)
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
                    usersServices.delete(id)
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
        // setDataTable(response.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
        try {
            usersServices.getAll().then(data => {
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
                            <TableCell>User</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Job Title</TableCell>
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
                                        <Avatar className="hidden mr-3 md:block" src={user.data.photoURL} alt="User avatar" />
                                        <div>
                                            <p className="font-semibold">{user.data.displayName}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{user.data.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {user.data.username}
                                </TableCell>
                                <TableCell>
                                    {user.data.job}
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
                                            <EditIcon className="w-5 h-5" aria-hidden="true" onClick={() => openModal(user)} />
                                        </Button>
                                        <Button layout="link" size="icon" aria-label="Detail">
                                            <InformationIcon className="w-5 h-5" aria-hidden="true" onClick={() => openModalDetail(user.data)} />
                                        </Button>
                                        <Button layout="link" size="icon" aria-label="Delete" onClick={() => handleDelete(user.id)}>
                                            <TrashIcon className="w-5 h-5" aria-hidden="true" />
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
            <ModalFormUser isModalOpen={isModalOpen} closeModal={closeModal} id={userId} data={userData} />
            <ModalDetailUser isModalOpen={isModalDetailOpen} closeModal={closeModalDetail} data={userData} />
        </>
    )
}

export default TableUser