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
import { EditIcon, TrashIcon } from '../../assets/icons'
import { rolesServices } from '../../services/roles'
import { Link } from 'react-router-dom'
import ModalFormRole from './ModalFormRole'
import Swal from 'sweetalert2'

function TableRole() {

    // setup pages control for every table
    const [pageTable, setpageTable] = useState(1)

    // setup data for every table
    const [dataTable, setDataTable] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [dataId, setDataId] = useState('')
    const [dataEdit, setDataEdit] = useState([])

    // pagination setup
    const resultsPerPage = 10
    const totalResults = dataTable.length

    const { roleName, description } = dataEdit;

    // pagination change control
    function onPageChangeTable(p) {
        setpageTable(p)
    }

    function openModal(data) {
        setIsModalOpen(true)
        setDataId(data.id)
        setDataEdit(data.data)
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
                                    <div className="flex items-center space-x-4">
                                        <Button layout="link" size="icon" aria-label="Edit" onClick={() => openModal(role)}>
                                            <EditIcon className="w-5 h-5" aria-hidden="true" />
                                        </Button>
                                        <Button layout="link" size="icon" aria-label="Delete" onClick={() => handleDelete(role.id)}>
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
            <ModalFormRole isModalOpen={isModalOpen} id={dataId} roleName={roleName} desc={description} closeModal={closeModal} />
        </>
    )
}

export default TableRole