import React, { useEffect, useState } from 'react'
import { Card, CardBody, Button, Input, Label, Select, Textarea } from '@windmill/react-ui'
import { useAuthState } from "react-firebase-hooks/auth";

import { useForm } from 'react-hook-form'
import { assetsServices } from '../../services/assets'
import Swal from 'sweetalert2'
import { Timestamp } from 'firebase/firestore'
import { useHistory, useParams } from 'react-router-dom'
import { sitesServices } from '../../services/sites'
import { auth } from '../../utils/firebase';
import { ArrowLeftIcon } from '../../assets/icons';

function FormITAsset() {
    const { id } = useParams();
    const [assetInfo, setAssetInfo] = useState({})
    const { register, handleSubmit, reset } = useForm()

    const [site, setSite] = useState([])
    const [disabled, setDisabled] = useState(true)
    const [requiredStatusDetail, setRequiredStatusDetail] = useState(false)
    const history = useHistory()
    const [user, loading] = useAuthState(auth);

    const handleChange = (e) => {
        if (e.target.value === "In Use") {
            setDisabled(false)
            setRequiredStatusDetail(true)
        } else {
            setDisabled(true)
            setRequiredStatusDetail(false)
        }
    }

    const onSubmit = (value) => {
        try {
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
                        information: {
                            operatingSystem: value.information.operatingSystem,
                            processor: value.information.processor,
                            ram: value.information.ram.toUpperCase().replace(/\s+/g, ''),
                            storageCapacity: value.information.storageCapacity.toUpperCase().replace(/\s+/g, ''),
                            storageType: value.information.storageType,
                        },
                        isArchive: value.isArchive,
                        status: value.status,
                        statusDetail: value.statusDetail,
                        description: value.description,
                        modifiedAt: Timestamp.now(),
                        modifiedBy: user.email
                    })
                    Swal.fire('Saved!', '', 'success')
                        .then(() => window.location.reload(history.replace('/app/assets')))
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
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

    useEffect(() => {
        try {
            assetsServices.getById(id).then(data => {
                setAssetInfo(data.information)
                reset(data)
                if (data.status === "In Use") {
                    setDisabled(false)
                    setRequiredStatusDetail(true)
                } else {
                    setDisabled(true)
                    setRequiredStatusDetail(false)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }, [id, reset])

    return (
        <>
            <div className="mt-5">
                <Button
                    layout="outline"
                    iconLeft={ArrowLeftIcon}
                    onClick={history.goBack}
                >
                    Go Back
                </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="my-8">
                <div className="grid gap-6 mb-8 md:grid-cols-2">
                    <Card>
                        <CardBody>
                            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Asset Detail</p>
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
                                        <option value="Laptop" >Laptop</option>
                                        <option value="Desktop" >Desktop</option>
                                    </Select>
                                </Label>
                                <Label className="mt-3">
                                    <span>Status<small className='text-red-600'>*</small></span>
                                    <Select className="mt-1" required {...register("status")} onChange={handleChange} >
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
                                <span>Archived<small className='text-red-600'>*</small></span>
                                <Select className="mt-1" required {...register("isArchive")} onChange={handleChange}>
                                    <option value={false}>False</option>
                                    <option value={true} >True</option>
                                </Select>
                            </Label>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody>
                            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Asset Information</p>
                            <Label className="mt-3">
                                <span>Operating System<small className='text-red-600'>*</small></span>
                                <Input
                                    className="mt-1"
                                    placeholder="Type here..."
                                    defaultValue={assetInfo.operatingSystem}
                                    required
                                    {...register("information.operatingSystem")}
                                />
                            </Label>
                            <Label className="mt-3">
                                <span>Processor<small className='text-red-600'>*</small></span>
                                <Input
                                    className="mt-1"
                                    placeholder="Type here..."
                                    defaultValue={assetInfo.processor}
                                    required
                                    {...register("information.processor")}
                                />
                            </Label>
                            <Label className="mt-3">
                                <span>RAM (GB)<small className='text-red-600'>*</small></span>
                                <Input
                                    className="mt-1"
                                    placeholder="Type here..."
                                    defaultValue={assetInfo.ram}
                                    required
                                    {...register("information.ram")}
                                />
                            </Label>
                            <Label className="mt-3">
                                <span>Storage Capacity (GB)<small className='text-red-600'>*</small></span>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <Input
                                        className="block w-full pl-48 mt-1"
                                        placeholder="Type here..."
                                        defaultValue={assetInfo.storageCapacity}
                                        required
                                        {...register("information.storageCapacity")}
                                    />
                                    <div className="absolute inset-y-0 left-0 flex items-center">
                                        <Select className="h-full py-0" required defaultValue={assetInfo.storageType} {...register("information.storageType")} >
                                            <option value="" >-- Choose one --</option>
                                            <option value="SSD" >SSD</option>
                                            <option value="HDD" >HDD</option>
                                        </Select>
                                    </div>
                                </div>
                            </Label>
                            <Label className="mt-3">
                                <span>Description</span>
                                <Textarea className="mt-1" rows="3" placeholder="Enter description about asset" {...register("description")} />
                            </Label>
                        </CardBody>
                    </Card>
                </div>
                <div className="flex justify-center space-x-4 text-center">
                    <Button layout="outline" onClick={history.goBack}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </>
    )
}

export default FormITAsset
