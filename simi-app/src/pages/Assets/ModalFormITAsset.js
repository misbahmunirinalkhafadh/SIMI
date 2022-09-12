import React, { useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, Select } from '@windmill/react-ui'
import { useForm } from 'react-hook-form'
import { assetsServices } from '../../services/assets'
import { Timestamp } from 'firebase/firestore'
import Swal from 'sweetalert2'

function ModalFormITAsset({ closeModal, id, isModalOpen }) {
    const { register, handleSubmit } = useForm()

    const onSubmit = (value) => {
        const dataAsset = {
            assetId: value.assetId,
            assetName: value.assetName,
            category: value.category,
            type: value.type,
            serialNumber: value.serialNumber,
            status: 'Standby',
            archived: false,
            createdAt: Timestamp.now()
        }
        console.log(value);
        try {
            // if (id == null) {
            Swal.fire({
                title: 'Do you want to save the New IT Asset?',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'Save',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    assetsServices.add(dataAsset)
                    console.log(value);
                    Swal.fire('Saved!', '', 'success')
                        .then(() => window.location.reload())
                    closeModal()
                }
            })
            // } else {
            //     Swal.fire({
            //         title: 'Do you want to save the changes?',
            //         showDenyButton: true,
            //         showCancelButton: true,
            //         confirmButtonText: 'Save',
            //         denyButtonText: `Don't save`,
            //     }).then((result) => {
            //         /* Read more about isConfirmed, isDenied below */
            //         if (result.isConfirmed) {
            //             // assetsServices.update(id, dataAsset)
            //             Swal.fire('Saved!', '', 'success')
            //                 .then(() => window.location.reload())
            //             closeModal()
            //         } else if (result.isDenied) {
            //             Swal.fire('Changes are not saved', '', 'info')
            //             closeModal()
            //         }
            //     })
            // }
        } catch (err) {
            alert(err)
        }
    }

    // useEffect(() => {
    //     try {
    //         assetsServices.getById(id).then(data => {
    //             console.log(data);
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }, [id])

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal} size='lg'>
                <ModalHeader>Form Data IT Asset</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <FieldAdd />

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

    function FieldAdd() {
        return (
            <>
                <Label>
                    <span>Asset ID<small className='text-red-600'>*</small></span>
                    <Input
                        name="assetId"
                        id="assetId"
                        className="mt-1"
                        placeholder="Type here..."
                        required
                        {...register("assetId")}
                    />
                </Label>
                <Label className="mt-3">
                    <span>Asset Name<small className='text-red-600'>*</small></span>
                    <Input
                        name="assetName"
                        id="assetName"
                        className="mt-1"
                        placeholder="Type here..."
                        required
                        {...register("assetName")}
                    />
                </Label>
                <Label className="mt-3">
                    <span>Category<small className='text-red-600'>*</small></span>
                    <Select className="mt-1" name="category" id="category" required {...register("category")}>
                        <option value="" > -- Choose one -- </option>
                        <option value="Laptop" >Laptop</option>
                        <option value="Desktop" >Desktop</option>
                    </Select>
                </Label>
                <Label className="mt-3">
                    <span>Type<small className='text-red-600'>*</small></span>
                    <Input
                        name="type"
                        id="type"
                        className="mt-1"
                        placeholder="Type here..."
                        required
                        {...register("type")}
                    />
                </Label>
                <Label className="mt-3">
                    <span>Serial Number<small className='text-red-600'>*</small></span>
                    <Input
                        name="serialNumber"
                        id="serialNumber"
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
                            name="serialNumber"
                            id="serialNumber"
                            className="block w-full pl-48 mt-1"
                            placeholder="Type here..."
                            required
                            {...register("serialNumber")}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center">
                            <Select className="h-full py-0" name="category" id="category" required {...register("category")}>
                                <option value="" > -- Choose one -- </option>
                                <option value="Laptop" >SSD</option>
                                <option value="Desktop" >HDD</option>
                            </Select>
                        </div>
                    </div>
                </Label>
            </>
        )
    }

}

export default ModalFormITAsset