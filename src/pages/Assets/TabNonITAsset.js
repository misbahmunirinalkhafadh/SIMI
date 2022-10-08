import React, { useEffect, useState } from 'react';

import { AddIcon, SearchIcon } from '../../assets/icons';
import { Input, Button, Select } from '@windmill/react-ui';
import TableNonITAsset from './TableNonITAsset';
import ModalFormNonITAsset from './ModalFormNonITAsset';
import { assetsServices } from '../../services/assets';

function TabNonITAsset() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [archive, setArchived] = useState('')
    const [category, setCategory] = useState([])
    const [status, setStatus] = useState([])

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    function onSelect(event) {
        setArchived(event.target.value)
    }

    useEffect(() => {
        try {
            assetsServices.getAllNonITAsset().then(data => {
                const uniqueTags = [];
                const uniqueStatus = [];
                data.forEach(asd => {
                    if (uniqueTags.indexOf(asd.data.category) === -1) {
                        uniqueTags.push(asd.data.category)
                    }
                });
                data.forEach(sts => {
                    if (uniqueStatus.indexOf(sts.data.status) === -1) {
                        uniqueStatus.push(sts.data.status)
                    }
                });
                setCategory(uniqueTags)
                setStatus(uniqueStatus)
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
                        <Select onChange={onSelect} >
                            <option value="Unarchived" >Unarchived</option>
                            <option value="Archived" >Archived</option>
                        </Select>
                    </div>
                    {/* Type  */}
                    <div className="ml-3" >
                        <Select>
                            <option value="" >All Category</option>
                            {category.map((data, i) => <option value={data} key={i}>{data}</option>)}
                        </Select>
                    </div>
                    {/* Status  */}
                    <div className="ml-3" >
                        <Select>
                            <option value="" >All Status</option>
                            {status.map((data, i) => <option value={data} key={i}>{data}</option>)}
                        </Select>
                    </div>
                </div>
                {/* Button Add */}
                <Button iconLeft={AddIcon} onClick={openModal}>
                    <span>Add New</span>
                </Button>
            </div>

            {/* Table Data */}
            <TableNonITAsset archived={archive} />

            <ModalFormNonITAsset isModalOpen={isModalOpen} closeModal={closeModal} />
        </>
    )
}

export default TabNonITAsset