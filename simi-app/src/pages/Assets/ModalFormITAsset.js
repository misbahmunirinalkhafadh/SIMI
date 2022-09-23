import React, { useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, Select } from '@windmill/react-ui'
import { useForm } from 'react-hook-form'
import { assetsServices } from '../../services/assets'
import { Timestamp } from 'firebase/firestore'
import Swal from 'sweetalert2'

function ModalFormITAsset({ closeModal, isModalOpen, id, data }) {
    const { register, handleSubmit, reset } = useForm({ defaultValues: data })

    const onSubmit = (value) => {
        const dataAsset = {
            assetName: value.assetName,
            category: value.category,
            type: value.type,
            serialNumber: value.serialNumber,
            storageCapacity: value.storageCapacity,
            storageType: value.storageType,
            visibility: value.visibility,
            status: 'Standby',
            createdAt: Timestamp.now()
        }

        try {
            if (id == null) {
                Swal.fire({
                    title: 'Do you want to save the New IT Asset?',
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        assetsServices.add(dataAsset)
                        Swal.fire('Saved!', '', 'success')
                            .then(() => window.location.reload())
                        closeModal()
                    }
                })
            } else {
                Swal.fire({
                    title: 'Do you want to save the changes?',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                    denyButtonText: `Don't save`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        assetsServices.update(id, {
                            assetName: value.assetName,
                            category: value.category,
                            type: value.type,
                            serialNumber: value.serialNumber,
                            storageCapacity: value.storageCapacity,
                            storageType: value.storageType,
                            status: value.status,
                            visibility: value.visibility,
                        })
                        // console.log("Edit : ",dataAsset);
                        Swal.fire('Saved!', '', 'success')
                            .then(() => window.location.reload())
                        closeModal()
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                        closeModal()
                    }
                })
            }
        } catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        reset(data)
    }, [reset, data])

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal} size='lg'>
                <ModalHeader>Form Data IT Asset</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <Label className="mt-3">
                            <span>Asset Name<small className='text-red-600'>*</small></span>
                            <Input
                                className="mt-1"
                                placeholder="Type here..."
                                required
                                {...register("assetName")}
                            />
                        </Label>
                        <Label className="mt-3">
                            <span>Category<small className='text-red-600'>*</small></span>
                            <Select className="mt-1" required {...register("category")}>
                                <option value="" >-- Choose one --</option>
                                <option value="Laptop" >Laptop</option>
                                <option value="Desktop" >Desktop</option>
                                <option value="Printer" >Printer</option>
                            </Select>
                        </Label>
                        <Label className="mt-3">
                            <span>Type<small className='text-red-600'>*</small></span>
                            <Input
                                className="mt-1"
                                placeholder="Type here..."
                                required
                                {...register("type")}
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
                            <span>Storage Capacity<small className='text-red-600'>*</small></span>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <Input
                                    className="block w-full pl-48 mt-1"
                                    placeholder="Type here..."
                                    required
                                    {...register("storageCapacity")}
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center">
                                    <Select className="h-full py-0" required {...register("storageType")}>
                                        <option value="" >-- Choose one --</option>
                                        <option value="SSD" >SSD</option>
                                        <option value="HDD" >HDD</option>
                                    </Select>
                                </div>
                            </div>
                        </Label>
                        <div className="grid col-gap-3 lg:grid-cols-2">
                            <Label className="mt-3">
                                <span>Status<small className='text-red-600'>*</small></span>
                                <Select className="mt-1" required {...register("status")}>
                                    <option value="" >-- Choose one --</option>
                                    <option value="Standby" >Standby</option>
                                    <option value="In Use" >In Use</option>
                                    <option value="In Repair" >In Repair</option>
                                    <option value="Dispose" >Dispose</option>
                                </Select>
                            </Label>
                            <Label className="mt-3">
                                <span>Visibility<small className='text-red-600'>*</small></span>
                                <Select className="mt-1" required {...register("visibility")}>
                                    <option value="Unarchived">Unarchived</option>
                                    <option value="Archived" >Archived</option>
                                    <option value="Draft" >Draft</option>
                                </Select>
                            </Label>
                        </div>
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