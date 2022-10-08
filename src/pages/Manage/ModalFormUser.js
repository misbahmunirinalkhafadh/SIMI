import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, Select } from '@windmill/react-ui'
import { MailIcon } from '../../assets/icons'
import { rolesServices } from '../../services/roles'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { usersServices } from '../../services/users'
import { Timestamp } from 'firebase/firestore'

function ModalFormUser({ closeModal, isModalOpen, id, data }) {
    const { register, handleSubmit, reset } = useForm({ defaultValues: data, })
    const [role, setRole] = useState([])
    const [roleSelected, setRoleSelected] = useState({})

    const handleChange = (e) => {
        let index = e.nativeEvent.target.selectedIndex;
        let label = e.nativeEvent.target[index].text;
        let value = e.target.value;
        setRoleSelected({ value: value, label: label })
    }

    const onSubmit = (value) => {
        const dataUser = {
            username: value.username,
            displayName: value.displayName,
            department: value.department,
            site: value.site,
            job: value.job,
            email: value.email,
            gender: value.gender,
            role: {
                id: roleSelected.value,
                roleName: roleSelected.label
            },
            status: "Unverified",
            createdAt: Timestamp.now(),
        }
        try {
            if (id == null) {
                Swal.fire({
                    title: 'Do you want to save the New User?',
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        usersServices.add(dataUser)
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
                        usersServices.update(id, {
                            username: value.username,
                            displayName: value.displayName,
                            department: value.department,
                            site: value.site,
                            role: {
                                id: roleSelected.value,
                                roleName: roleSelected.label
                            },
                            email: value.email,
                            gender: value.gender,
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
        reset(data);
    }, [reset, data])

    useEffect(() => {
        try {
            rolesServices.getAll().then(data => {
                setRole(data)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>Form Data User</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <Label className="mt-3">
                            <span>Full Name<small className='text-red-600'>*</small></span>
                            <Input
                                className="mt-1"
                                placeholder="Type here..."
                                required
                                {...register("displayName")}
                            />
                        </Label>

                        <Label className="mt-3">
                            <span>Email Address<small className='text-red-600'>*</small></span>
                            {/* <!-- focus-within sets the color for the icon when input is focused --> */}
                            <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                {/* <input
                                    className="block w-full pr-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                    placeholder="Type here..."
                                /> */}
                                <Input
                                    className="mt-1"
                                    placeholder="Type here..."
                                    type="email"
                                    required
                                    {...register("email")}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                                    <MailIcon className="w-5 h-5" aria-hidden="true" />
                                </div>
                            </div>
                        </Label>
                        <div className="grid col-gap-3 lg:grid-cols-2">
                            <Label className="mt-3">
                                <span>Username<small className='text-red-600'>*</small></span>
                                <Input
                                    className="mt-1"
                                    placeholder="Type here..."
                                    required
                                    {...register("username")}
                                />
                            </Label>
                            <Label className="mt-3">
                                <span>Department<small className='text-red-600'>*</small></span>
                                <Input
                                    className="mt-1"
                                    placeholder="Type here..."
                                    required
                                    {...register("department")}
                                />
                            </Label>
                            <Label className="mt-3">
                                <span>Site<small className='text-red-600'>*</small></span>
                                <Input
                                    className="mt-1"
                                    placeholder="Type here..."
                                    required
                                    {...register("site")}
                                />
                            </Label>
                            <Label className="mt-3">
                                <span>Job Title<small className='text-red-600'>*</small></span>
                                <Input
                                    className="mt-1"
                                    placeholder="Type here..."
                                    required
                                    {...register("job")}
                                />
                            </Label>
                        </div>
                        <div className="grid col-gap-3 lg:grid-cols-2">
                            <Label className="mt-3">
                                <span>Gender<small className='text-red-600'>*</small></span>
                                <Select className="mt-1" {...register("gender")}>
                                    <option value="">-- Choose One --</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Select>
                            </Label>
                            <Label className="mt-3">
                                <span>Role<small className='text-red-600'>*</small></span>
                                <Select className="mt-1" {...register("role.id")} onChange={handleChange}>
                                    <option value="">-- Choose One --</option>
                                    {role.map((role, i) => (
                                        <option key={i} value={role.id}>{role.data.roleName}</option>
                                    ))}
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

export default ModalFormUser