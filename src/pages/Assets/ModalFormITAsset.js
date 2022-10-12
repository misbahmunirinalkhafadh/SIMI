import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, Select , Textarea} from '@windmill/react-ui'
import { useForm } from 'react-hook-form'
import { Timestamp } from 'firebase/firestore'
import Swal from 'sweetalert2'
import { useAuthState } from "react-firebase-hooks/auth";

import { assetsServices } from '../../services/assets'
import { sitesServices } from '../../services/sites'
import { auth } from '../../utils/firebase'

function ModalFormITAsset({ closeModal, isModalOpen }) {
    const { register, handleSubmit } = useForm({})
    const [site, setSite] = useState([])
    const [user, loading] = useAuthState(auth);

    const onSubmit = (value) => {
        const dataAsset = {
            site: value.site,
            salesOrder: value.salesOrder,
            brand: value.brand,
            model: value.model,
            serialNumber: value.serialNumber.toUpperCase(),
            category: value.category,
            information: {
                operatingSystem: value.operatingSystem,
                processor: value.processor,
                ram: value.ram.toUpperCase().replace(/\s+/g, ''),
                storageCapacity: value.storageCapacity.toUpperCase().replace(/\s+/g, ''),
                storageType: value.storageType
            },
            isArchived: false,
            status: 'Ready',
            statusDetail: '',
            description: value.description,
            modifiedBy: '',
            modifiedAt: '',
            createdBy: user.email,
            createdAt: Timestamp.now(),
        }

        try {
            Swal.fire({
                title: 'Do you want to save the New IT Asset?',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'Save',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    assetsServices.add(dataAsset)
                    console.log(dataAsset);
                    Swal.fire('Saved!', '', 'success')
                        .then(() => window.location.reload())
                    closeModal()
                }
            })
        } catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        if (loading) return;
    }, [loading])

    useEffect(() => {
        try {
            sitesServices.getAll().then(data => {
                setSite(data)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal} size='lg'>
                <ModalHeader>Form Data IT Asset</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <Label>
                            <span>Site<small className='text-red-600'>*</small></span>
                            <Select className="mt-1" required {...register("site")}>
                                <option value="" >-- Choose one --</option>
                                {site.map((site, i) => (
                                    <option key={i} value={site.id}>{site.data.name}</option>
                                ))}
                            </Select>
                        </Label>
                        <Label className="mt-3">
                            <span>SO Number<small className='text-red-600'>*</small></span>
                            <Input
                                className="mt-1"
                                placeholder="Type here..."
                                required
                                {...register("salesOrder")}
                            />
                        </Label>
                        <div className="grid col-gap-3 lg:grid-cols-2">
                            <Label className="mt-3">
                                <span>Brand<small className='text-red-600'>*</small></span>
                                <Input
                                    className="mt-1"
                                    placeholder="Type here..."
                                    required
                                    {...register("brand")}
                                />
                            </Label>
                            <Label className="mt-3">
                                <span>Model<small className='text-red-600'>*</small></span>
                                <Input
                                    className="mt-1"
                                    placeholder="Type here..."
                                    required
                                    {...register("model")}
                                />
                            </Label>
                            <Label className="mt-3">
                                <span>Serial Number<small className='text-red-600'>*</small></span>
                                <Input
                                    className="mt-1"
                                    placeholder="Type here..."
                                    required
                                    {...register("serialNumber")}
                                />
                            </Label>
                            <Label className="mt-3">
                                <span>Category<small className='text-red-600'>*</small></span>
                                <Select className="mt-1" required {...register("category")}>
                                    <option value="" >-- Choose one --</option>
                                    <option value="Laptop" >Laptop</option>
                                    <option value="Desktop" >Desktop</option>
                                </Select>
                            </Label>
                            <Label className="mt-3">
                                <span>Operating System<small className='text-red-600'>*</small></span>
                                <Input
                                    className="mt-1"
                                    placeholder="Type here..."
                                    required
                                    {...register("operatingSystem")}
                                />
                            </Label>
                            <Label className="mt-3">
                                <span>Processor<small className='text-red-600'>*</small></span>
                                <Input
                                    className="mt-1"
                                    placeholder="Type here..."
                                    required
                                    {...register("processor")}
                                />
                            </Label>
                            <Label className="mt-3">
                                <span>RAM (GB)<small className='text-red-600'>*</small></span>
                                <Input
                                    className="mt-1"
                                    placeholder="Type here..."
                                    required
                                    {...register("ram")}
                                />
                            </Label>
                            <Label className="mt-3">
                                <span>Storage Capacity (GB)<small className='text-red-600'>*</small></span>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <Input
                                        className="block w-full pl-32 mt-1"
                                        placeholder="Type here..."
                                        required
                                        {...register("storageCapacity")}
                                    />
                                    <div className="absolute inset-y-0 left-0 flex items-center">
                                        <Select className="h-full py-0" required {...register("storageType")}>
                                            <option value="" >-- Type --</option>
                                            <option value="SSD" >SSD</option>
                                            <option value="HDD" >HDD</option>
                                        </Select>
                                    </div>
                                </div>
                            </Label>
                        </div>
                        <Label className="mt-3">
                            <span>Description</span>
                            <Textarea className="mt-1" rows="3" placeholder="Enter description about asset" {...register("description")} />
                        </Label>
                    </ModalBody>
                    <ModalFooter>
                        {/* I don't like this approach. Consider passing a prop to ModalFooter
                        * that if present, would duplicate the buttons in a way similar to this.
                        * Or, maybe find some way to pass something like size="large md:regular"
                        * to Button
                        */}
                        <div className="hidden sm:block">
                            <Button layout="outline" onClick={closeModal}>
                                Cancel
                            </Button>
                        </div>
                        <div className="hidden sm:block">
                            <Button type="submit">Save</Button>
                        </div>
                        <div className="block w-full sm:hidden">
                            <Button block size="large" layout="outline" onClick={closeModal}>
                                Cancel
                            </Button>
                        </div>
                        <div className="block w-full sm:hidden">
                            <Button block size="large" type="submit">
                                Save
                            </Button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    )
}

export default ModalFormITAsset