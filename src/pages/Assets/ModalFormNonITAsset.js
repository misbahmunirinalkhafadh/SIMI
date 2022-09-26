import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, Select, Textarea } from '@windmill/react-ui'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { Timestamp } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";

import { assetsServices } from '../../services/assets'
import { auth } from '../../utils/firebase'
import { sitesServices } from '../../services/sites'

function ModalFormNonITAsset({ closeModal, isModalOpen, id, data }) {
    const { register, handleSubmit, reset } = useForm({ defaultValues: data })
    const [siteLabel, setSiteLabel] = useState('')
    const [user, loading] = useAuthState(auth);
    const [requiredStatusDetail, setRequiredStatusDetail] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [site, setSite] = useState([])

    const handleChange = (e) => {
        let index = e.nativeEvent.target.selectedIndex;
        let label = e.nativeEvent.target[index].text;
        setSiteLabel(label)
        if (e.target.value === "In Use") {
            setDisabled(false)
            setRequiredStatusDetail(true)
        } else {
            setDisabled(true)
            setRequiredStatusDetail(false)
        }
    }

    const onSubmit = (value) => {
        const dataAsset = {
            site: siteLabel,
            salesOrder: value.salesOrder,
            brand: value.brand,
            model: value.model,
            serialNumber: value.serialNumber.toUpperCase(),
            category: value.category,
            visibility: 'Unarchived',
            status: 'Ready',
            statusDetail: '',
            description: value.description,
            modifiedBy: '',
            modifiedAt: '',
            createdBy: user.email,
            createdAt: Timestamp.now(),
        }

        try {
            if (id == null) {
                Swal.fire({
                    title: 'Do you want to save the New Non IT Asset?',
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
                            site: value.site,
                            salesOrder: value.salesOrder,
                            brand: value.brand,
                            model: value.model,
                            serialNumber: value.serialNumber.toUpperCase(),
                            category: value.category,
                            visibility: value.visibility,
                            status: value.status,
                            statusDetail: value.statusDetail,
                            description: value.description,
                            modifiedBy: user.email,
                            modifiedAt: Timestamp.now(),
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
        if (loading) return;
    }, [loading])

    useEffect(() => {
        reset(data)
    }, [reset, data])

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
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>Form Data Non IT Asset</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <Label>
                            <span>Site<small className='text-red-600'>*</small></span>
                            <Select className="mt-1" required {...register("site")} onChange={handleChange}>
                                <option value="" >-- Choose one --</option>
                                {site.map((site, i) => (
                                    <option key={i} value={site.data.name}>{site.data.name}</option>
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
                                    <option value="Printer" >Printer</option>
                                    <option value="Projector" >Projector</option>
                                </Select>
                            </Label>
                        </div>
                        <div hidden={!id ? true : false}>
                            <div className="grid col-gap-3 lg:grid-cols-2">
                                <Label className="mt-3">
                                    <span>Status<small className='text-red-600'>*</small></span>
                                    <Select className="mt-1" required={!id ? false : true} {...register("status")} onChange={handleChange} >
                                        <option value="" >-- Choose one --</option>
                                        <option value="Ready" >Ready</option>
                                        <option value="In Use" >In Use</option>
                                        <option value="Broken" >Broken</option>
                                        <option value="On Service" >On Service</option>
                                    </Select>
                                </Label>
                                <Label className="mt-3">
                                    <span>Status Detail<small className='text-red-600'>*</small></span>
                                    <Select className="mt-1" required={requiredStatusDetail} {...register("statusDetail")} disabled={disabled} >
                                        <option value="" >-- Choose one --</option>
                                        <option value="In Use Employee" >In Use Employee</option>
                                        <option value="In Use Loan" >In Use Loan</option>
                                        <option value="In Use Backup" >In Use Backup</option>
                                    </Select>
                                </Label>
                            </div>
                            <Label className="mt-3">
                                <span>Visibility<small className='text-red-600'>*</small></span>
                                <Select className="mt-1" required={!id ? false : true} {...register("visibility")} onChange={handleChange}>
                                    <option value="Unarchived">Unarchived</option>
                                    <option value="Archived" >Archived</option>
                                </Select>
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
                            <Button type="submit" block size="large">
                                Save
                            </Button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    )
}

export default ModalFormNonITAsset