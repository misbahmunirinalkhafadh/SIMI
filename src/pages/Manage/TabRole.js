import React, { useState } from 'react';

import { AddIcon, SearchIcon } from '../../assets/icons';
import { Input, Button } from '@windmill/react-ui';
import TableRole from './TableRole';
import ModalFormRole from './ModalFormRole';

function TabRole() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    return (
        <>
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
                </div>
                <Button iconLeft={AddIcon} onClick={openModal}>
                    <span>Add New</span>
                </Button>
            </div>

            {/* Table Data */}
            <TableRole />

            <ModalFormRole isModalOpen={isModalOpen} closeModal={closeModal} />
        </>
    )
}

export default TabRole