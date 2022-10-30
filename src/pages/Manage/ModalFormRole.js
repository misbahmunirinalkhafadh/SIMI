import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from '@windmill/react-ui'
import { Timestamp } from 'firebase/firestore'
import Swal from 'sweetalert2'

import { rolesServices } from '../../services/roles'

function ModalFormRole({ closeModal, isModalOpen, id, data }) {
    const { register, handleSubmit, reset } = useForm({ defaultValues: data })

    const onSubmit = (value) => {
        const dataRole = {
            roleName: value.roleName,
            description: value.description,
            priviledges: [
                {
                    permission: 'Home',
                    view: false,
                    add: false,
                    edit: false,
                    delete: false,
                },
                {
                    permission: 'Dashboard',
                    view: false,
                    add: false,
                    edit: false,
                    delete: false,
                },
                {
                    permission: 'Assets',
                    view: false,
                    add: false,
                    edit: false,
                    delete: false,
                },
                {
                    permission: 'Request Service',
                    view: false,
                    add: false,
                    edit: false,
                    delete: false,
                },
                {
                    permission: 'Manage',
                    view: false,
                    add: false,
                    edit: false,
                    delete: false,
                },
                {
                    permission: 'Pending',
                    view: false,
                    add: false,
                    edit: false,
                    delete: false,
                },
                {
                    permission: 'Deployed',
                    view: false,
                    add: false,
                    edit: false,
                    delete: false,
                },
                {
                    permission: 'Withdrawn',
                    view: false,
                    add: false,
                    edit: false,
                    delete: false,
                },
            ],
            createdAt: Timestamp.now()
        }
        try {
            if (id == null) {
                Swal.fire({
                    title: 'Do you want to save the New Role?',
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        rolesServices.add(dataRole)
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
                        rolesServices.update(id, {
                            roleName: value.roleName,
                            description: value.description,
                        })
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
                <ModalHeader>Form Data Role</ModalHeader>
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

export default ModalFormRole