import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, ModalHeader, ModalBody, ModalFooter, Select, Button, Label, Input, Textarea } from '@windmill/react-ui'
import { Timestamp } from 'firebase/firestore'
import Swal from 'sweetalert2'
import ReactSelect from 'react-select'


import { requestsServices } from '../../services/requests'
import { assetsServices } from '../../services/assets'
import { usersServices } from '../../services/users'
import useDataUser from '../../hooks/useDataUser'
import useDataSite from '../../hooks/useDataSite'
import ActionSelect from './ActionSelect'

function ModalFormDeploy({ closeModal, isModalOpen, id, data }) {
    const { register, onChange, handleSubmit, control, reset } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        shouldUnregister: true,
        defaultValues: data
    })
    const [listAsset, setListAsset] = useState([])
    const [listUser, setListUser] = useState([])
    const { allUser } = useDataUser();
    const { dataSite } = useDataSite();

    const handleChange = useCallback((value, name) => {
        console.log(prev => ({
            ...prev,
            [name]: value
        }));
        console.log(value);
    }, []);

    const onSubmit = (value) => {
        console.log(value);
        const dataRequest = {
            salesOrder: value.salesOrder,
            brand: value.brand,
            model: value.model,
            serialNumber: value.serialNumber,
            category: value.category,
            displayName: value.user,
            email: value.email,
            isDeployed: false,
            statusDeploy: 'Assigned',
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
                        // requestsServices.add(dataRequest)
                        const assetId = ''
                        // assetsServices.update(assetId, {
                        //     status: value.status
                        // })
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

    useEffect(() => {
        try {
            assetsServices.getAll().then(res => {
                const laptop = res?.filter((e) => e.data.category === "Laptop" && e.data.isArchived === false)
                    .map(({ id, data }) => {
                        let arr = []
                        let disabled = true
                        if (data.status === "Ready") {
                            disabled = false
                        }
                        arr = { value: id, label: data.serialNumber, type: `${data.brand} ${data.model}`, isDisabled: disabled }
                        return arr
                    });
                const desktop = res?.filter((e) => e.data.category === "Desktop" && e.data.isArchived === false)
                    .map(({ id, data }) => {
                        let arr = []
                        let disabled = true
                        if (data.status === "Ready") {
                            disabled = false
                        }
                        arr = { value: id, label: data.serialNumber, type: `${data.brand} ${data.model}`, isDisabled: disabled }
                        return arr
                    });
                const printer = res?.filter((e) => e.data.category === "Printer" && e.data.isArchived === false)
                    .map(({ id, data }) => {
                        let arr = []
                        let disabled = true
                        if (data.status === "Ready") {
                            disabled = false
                        }
                        arr = { value: id, label: data.serialNumber, type: `${data.brand} ${data.model}`, isDisabled: disabled }
                        return arr
                    });
                const projector = res?.filter((e) => e.data.category === "Projector" && e.data.isArchived === false)
                    .map(({ id, data }) => {
                        let arr = []
                        let disabled = true
                        if (data.status === "Ready") {
                            disabled = false
                        }
                        arr = { value: id, label: data.serialNumber, type: `${data.brand} ${data.model}`, isDisabled: disabled }
                        return arr
                    });

                const group = [
                    { label: 'Laptop', options: laptop },
                    { label: 'Desktop', options: desktop },
                    { label: 'Printer', options: printer },
                    { label: 'Projector', options: projector },
                ]

                const assets = res?.filter((e) => e.data.isArchived === false)
                    .map(({ id, data }) => {
                        let arr = []
                        let disabled = true
                        if (data.status === "Ready") {
                            disabled = false
                        }
                        arr = { value: id, label: data.serialNumber, type: `${data.brand} ${data.model}`, isDisabled: disabled }
                        return arr
                    });

                setListAsset(assets)
            })
        } catch (err) {
            alert(err)
        }
    }, [])

    useEffect(() => {
        try {
            usersServices.getAll().then(res => {
                const users = res.map(({ id, data }) => {
                    let arr = []
                    arr = { value: id, label: data.email }
                    return arr
                });
                setListUser(users)
            })
        } catch (err) {
            alert(err)
        }
    }, [])

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>Form Deployment Asset</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <Label className="mt-3">
                            <span>Category<small className='text-red-600'>*</small></span>
                            <Select className="mt-1" required {...register("category")}>
                                <option value="" >-- Choose one --</option>
                                <option value="Laptop" >Laptop</option>
                                <option value="Desktop" >Desktop</option>
                                <option value="Printer" >Printer</option>
                                <option value="Projector" >Projector</option>
                            </Select>
                        </Label>
                        <Label className="mt-3">
                            <span>Serial Number<small className='text-red-600'>*</small></span>
                            <ReactSelect
                                className="mt-1"
                                placeholder="Type here..."
                                name="asset"
                                isClearable
                                options={listAsset}
                                onChange={handleChange}
                                getOptionLabel={(option) => `${option.label}: ${option.type}`}
                            />
                        </Label>
                        <Label className="mt-3">
                            <span>Email<small className='text-red-600'>*</small></span>
                            <ReactSelect
                                className="mt-1"
                                placeholder="Type here..."
                                name="user"
                                isClearable
                                options={listUser}
                                onChange={handleChange}
                            />
                        </Label>
                        <Label className="mt-3">
                            <span>User</span>
                            <Input
                                className="mt-1"
                                placeholder="Type here..."
                                disabled
                                {...register("user")}
                            />
                        </Label>
                        <Label className="mt-3">
                            <span>Notes</span>
                            <Textarea
                                className="mt-1"
                                rows="3"
                                placeholder="Enter notes for user..."
                                {...register("notes")}
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

export default ModalFormDeploy