import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Input } from '@windmill/react-ui'
import { Timestamp } from 'firebase/firestore'
import Swal from 'sweetalert2'
import { requestsServices } from '../../services/requests'

function ModalFormRequest({ closeModal, isModalOpen, id, data }) {
    const { register, handleSubmit, reset } = useForm({ defaultValues: data })

    const onSubmit = (value) => {
        const dataRequest = {

            createdAt: Timestamp.now()
        }
        try {
            if (id == null) {
                Swal.fire({
                    title: 'Do you want to save the New Request Service?',
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        requestsServices.add(dataRequest)
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
                        // requestsServices.update(id, {
                        //     roleName: value.roleName,
                        //     description: value.description,
                        // })
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
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>Form Data Request</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <Label>
                            <span>Role Name<small className='text-red-600'>*</small></span>
                            <Input
                                className="mt-1"
                                placeholder="Type here..."
                                required
                                {...register("roleName")}
                            />
                        </Label>
                        <Label className="mt-3">
                            <span>Description<small className='text-red-600'>*</small></span>
                            <Input
                                className="mt-1"
                                placeholder="Type here..."
                                required
                                {...register("description")}
                            />
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
                            <Button type="submit" >Save</Button>
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

export default ModalFormRequest