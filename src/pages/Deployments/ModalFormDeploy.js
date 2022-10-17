import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, ModalHeader, ModalBody, ModalFooter, Select, Button, Label, Input } from '@windmill/react-ui'
import { Timestamp } from 'firebase/firestore'
import Swal from 'sweetalert2'

import useDataUser from '../../hooks/useDataUser'
import useDataSite from '../../hooks/useDataSite'
import ActionSelect from './ActionSelect'
import useDataAsset from '../../hooks/useDataAsset'
import { deploymentsServices } from '../../services/deployments'
import { assetsServices } from '../../services/assets'

function ModalFormDeploy({ closeModal, isModalOpen, id, data }) {
    const { register, handleSubmit, control, reset } = useForm({ defaultValues: data })
    const [listAsset, setListAsset] = useState([])
    const [listUser, setListUser] = useState([])
    const { allUser, dataUser } = useDataUser();
    const { allSite } = useDataSite();
    const { allAsset } = useDataAsset();
    const [filter, setFilter] = useState({})
    const [userdata, setUserdata] = useState({})

    const indexAsset = listAsset?.findIndex(e => e?.label === data?.serialNumber)
    const indexUser = listUser?.findIndex(e => e?.label === data?.email)

    const handleChange = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (value) => {
        const dataRequest = {
            assetSite: value.dataAsset.site,
            category: value.dataAsset.category,
            serialNumber: value.dataAsset.label,
            brand: value.dataAsset.brand,
            model: value.dataAsset.model,
            email: userdata.label,
            user: userdata.name,
            job: userdata.job,
            department: userdata.department,
            isDeployed: false,
            statusDeploy: 'Assigned',
            createdBy: dataUser?.displayName,
            createdAt: Timestamp.now(),
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
                        let id = value.dataAsset.value
                        console.log(dataRequest);
                        deploymentsServices.add(dataRequest)
                        assetsServices.update(id, { status: 'Assigned' })
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
                        // modifiedBy: '',
                        //     modifiedAt: Timestamp.now()
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
        let assetFilter = []
        assetFilter.push(allAsset?.filter((e) => {
            let archive = e.data.isArchived === false;
            let site = filter.site !== "" ? e.data.site.search(filter.site) !== -1 : true;
            let category = filter.category !== "" ? e.data.category.search(filter.category) !== -1 : true;
            let asset = archive && site && category

            return asset
        }));

        setListAsset(
            assetFilter[0].map(({ id, data }) => {
                let arr = []
                let disabled = true
                if (data.status === "Ready" && data.isArchived === false) {
                    disabled = false
                }
                arr = { value: id, label: data.serialNumber, site: data.site, category: data.category, brand: data.brand, model: data.model, isDisabled: disabled }
                return arr
            }))
    }, [allAsset, filter])

    useEffect(() => {
        const users = allUser?.map(({ id, data }) => {
            let arr = []
            arr = { value: id, label: data.email, name: data.displayName, job: data.job, department: data.department }
            return arr
        });
        if (allUser) setListUser(users)
    }, [allUser])

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>Form Deployment Asset</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <Label className="mt-3">
                            <span>Asset Site<small className='text-red-600'>*</small></span>
                            <Select className="mt-1" name="site" required defaultValue={data?.assetSite} onChange={handleChange} >
                                <option value="" >-- Choose one --</option>
                                {allSite.map((site, i) => (
                                    <option key={i} value={site.id}>{site.data.name}</option>
                                ))}
                            </Select>
                        </Label>
                        <Label className="mt-3">
                            <span>Category<small className='text-red-600'>*</small></span>
                            <Select className="mt-1" name="category" required defaultValue={data?.category} onChange={handleChange} >
                                <option value="" >-- Choose one --</option>
                                <option value="Laptop" >Laptop</option>
                                <option value="Desktop" >Desktop</option>
                                <option value="Printer" >Printer</option>
                                <option value="Projector" >Projector</option>
                            </Select>
                        </Label>
                        <Label className="mt-3">
                            <span>Serial Number<small className='text-red-600'>*</small></span>
                            <ActionSelect
                                name="dataAsset"
                                control={control}
                                options={listAsset}
                                optionLabel={true}
                                defaultValue={listAsset[indexAsset]}
                            />
                        </Label>
                        <Label className="mt-3">
                            <span>Email<small className='text-red-600'>*</small></span>
                            <ActionSelect
                                name="dataUser"
                                control={control}
                                options={listUser}
                                optionLabel={false}
                                defaultValue={listUser[indexUser]}
                                onChange={(choice) => setUserdata(choice)}
                            />
                        </Label>
                        <Label className="mt-3">
                            <span>User</span>
                            <Input
                                className="mt-1"
                                disabled
                                value={userdata?.name || ''}
                                {...register('user')}
                            />
                        </Label>
                        <Label className="mt-3">
                            <span>Job Title</span>
                            <Input
                                className="mt-1"
                                disabled
                                value={userdata?.job || ''}
                                {...register('job')}
                            />
                        </Label>
                        <Label className="mt-3">
                            <span>Department</span>
                            <Input
                                className="mt-1"
                                disabled
                                value={userdata?.department || ''}
                                {...register('department')}
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