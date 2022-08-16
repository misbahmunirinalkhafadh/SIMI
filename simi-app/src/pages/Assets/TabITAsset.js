import React, { useState } from 'react';

import { SearchIcon } from '../../assets/icons';
import { Input, Button } from '@windmill/react-ui';
import ModalFormITAsset from './ModalFormITAsset';
import TableITAsset from './TableITAsset';

function TabITAsset() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }
    return (
        <>
            {/* <!-- Search input --> */}
            <div className="flex justify-center flex-1 mb-4">
                <div className="relative w-full focus-within:text-purple-500">
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

            {/* Button Add */}
            <div className='flex justify-end mx-4 mb-4'>
                <Button onClick={openModal}>
                    Add New
                    <span className="ml-2" aria-hidden="true">
                        +
                    </span>
                </Button>
            </div>

            {/* Table Data */}
            <TableITAsset />

            <ModalFormITAsset isModalOpen={isModalOpen} closeModal={closeModal} />
        </>
    )
}

export default TabITAsset