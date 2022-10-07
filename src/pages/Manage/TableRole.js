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
} from '@windmill/react-ui'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

import { EditIcon, TrashIcon } from '../../assets/icons'
import { rolesServices } from '../../services/roles'
import ModalFormRole from './ModalFormRole'

function TableRole() {
    const [response, setResponse] = useState([])

    // setup pages control for every table
    const [pageTable, setPageTable] = useState(1)

    // setup data for every table
    const [dataTable, setDataTable] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [roleId, setRoleId] = useState(null)
    const [roleData, setRoleData] = useState([])

    // pagination setups
    const resultsPerPage = 10

    // pagination change control
    function onPageChangeTable(p) {
        setPageTable(p)
    }

    function openModal(data) {
        setIsModalOpen(true)
        setRoleId(data.id)
        setRoleData(data.data)
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
                    rolesServices.delete(id)
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

    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
        try {
            rolesServices.getAll().then(data => {
                setResponse(data)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        setDataTable(response.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
    }, [response, pageTable])

    return (
        <>
            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Role Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {dataTable.map((role) => (
                            <TableRow className="dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={role.id}>
                                <TableCell>
                                    <Link to={`/app/manage/role/permission/${role.id}`} className='text-blue-500' >{role.data.roleName}</Link>
                                </TableCell>
                                <TableCell>
                                    {role.data.description}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Button layout="link" size="icon" aria-label="Edit" onClick={() => openModal(role)}>
                                            <EditIcon className="w-5 h-5" aria-hidden="true" color="#7e3af2" />
                                        </Button>
                                        <Button layout="link" size="icon" aria-label="Delete" onClick={() => handleDelete(role.id)}>
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
            <ModalFormRole isModalOpen={isModalOpen} closeModal={closeModal} id={roleId} data={roleData} />
        </>
    )
}

export default TableRole