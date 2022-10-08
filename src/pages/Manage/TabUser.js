import React, { useEffect, useState } from 'react';

import { AddIcon, SearchIcon } from '../../assets/icons';
import { Input, Button, Select } from '@windmill/react-ui';
import ModalFormUser from './ModalFormUser';
import TableUser from './TableUser';
import { usersServices } from '../../services/users';

function TabUser() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [listRole, setListRole] = useState([])

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    useEffect(() => {
        try {
            usersServices.getAll().then(data => {
                const uniqueTags = [];
                data.forEach(asd => {
                    if (uniqueTags.indexOf(asd.data.role.roleName) === -1) {
                        uniqueTags.push(asd.data.role.roleName)
                    }
                });
                setListRole(uniqueTags)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>
            {/* Action  */}
            <div className='flex justify-between mx-4 mb-4'>
                <div className='flex justify-start'>
                    {/* Search */}
                    <div className="relative w-64 focus-within:text-purple-500">
                        <div className="absolute inset-y-0 flex items-center pl-2">
                            <SearchIcon className="w-4 h-4 text-purple-600" aria-hidden="true" />
                        </div>
                        <Input
                            className="pl-8 text-gray-700"
                            placeholder="Search for data"
                            aria-label="Search"
                        />
                    </div>
                    {/* Filter  */}
                    <div className="ml-3">
                        <Select>
                            <option value="" >All Role</option>
                            {listRole.map((data, i) => <option value={data} key={i}>{data}</option>)}
                        </Select>
                    </div>
                    {/* Type  */}
                    <div className="ml-3" >
                        <Select>
                            <option value="" >All Status</option>
                            <option value="">Active</option>
                            <option value="">Banned</option>
                            <option value="">Not Active</option>
                            <option value="">Not Comfirmed</option>
                        </Select>
                    </div>
                </div>
                {/* Button Add */}
                <Button iconLeft={AddIcon} onClick={openModal}>
                    <span>Add New</span>
                </Button>
            </div>

            {/* Table Data */}
            <TableUser />

            <ModalFormUser isModalOpen={isModalOpen} closeModal={closeModal} />
        </>
    )
}

export default TabUser