import React, { useState } from 'react';

import { AddIcon, SearchIcon } from '../../assets/icons';
import { Input, Button, Select } from '@windmill/react-ui';
import ModalFormITAsset from './ModalFormITAsset';
import TableITAsset from './TableITAsset';

function TabITAsset() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selected, setSelected] = useState('')

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    function onSelect(event) {
        setSelected(event.target.value)
    }

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
                    <div>
                        <Select className="ml-3" onChange={onSelect} >
                            <option value="unarchived" >Unarchived</option>
                            <option value="archived" >Archived</option>
                            <option value="draft" >Draft</option>
                        </Select>
                    </div>
                </div>
                {/* Button Add */}
                <Button iconLeft={AddIcon} onClick={openModal}>
                    <span>Add New</span>
                </Button>
            </div>

            {/* Table Data */}
            <TableITAsset archive={selected} />

            <ModalFormITAsset isModalOpen={isModalOpen} closeModal={closeModal} />
        </>
    )
}

export default TabITAsset