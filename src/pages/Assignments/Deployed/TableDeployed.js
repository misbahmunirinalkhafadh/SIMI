import React, { useEffect, useState } from 'react'
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Pagination,
    Badge,
    Button
} from '@windmill/react-ui'
import useDataDeployment from '../../../hooks/useDataDeployment'
import { DownloadIcon, InformationIcon, WithdrawIcon } from '../../../assets/icons'
import useDataSite from '../../../hooks/useDataSite'
import ModalDetail from '../ModalDetail'
import Swal from 'sweetalert2'
import { deploymentsServices } from '../../../services/deployments'
import { assetsServices } from '../../../services/assets'
import useDataAsset from '../../../hooks/useDataAsset'
import { deleteField, Timestamp } from 'firebase/firestore'
import useDataUser from '../../../hooks/useDataUser'
import { BASTDeployment } from '../../../components/templates/BASTDeployment'

export default function TableDeployed({ filter }) {
    const { allDeployment } = useDataDeployment({})
    const { allSite } = useDataSite({})
    const { allAsset } = useDataAsset([])
    const { role, dataUser } = useDataUser([])
    const [detail, setDetail] = useState({})
    const [response, setResponse] = useState([])

    const priviledges = role?.priviledges?.filter(e => e.permission === "Assignments")[0];

    // setup pages control for every table
    const [pageTable, setPageTable] = useState(1)

    // setup data for every table
    const [dataTable, setDataTable] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false)

    // pagination setup
    const resultsPerPage = 10

    // pagination change control
    function onPageChangeTable(p) {
        setPageTable(p)
    }

    function openModal(value) {
        setIsModalOpen(true)
        setDetail(value)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    const handleWithdraw = ({ id, data }) => {
        try {
            Swal.fire({
                title: "Withdraw",
                text: "Do you want to withdraw this asset? Please enter remark",
                input: 'text',
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, withdraw it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    const withdrawn = {
                        status: 'Asset Returned',
                        remark: result.value,
                        withdrawnAt: Timestamp.now(),
                        withdrawnBy: dataUser.email
                    }
                    deploymentsServices.update(id, { isWithdrawn: true, statusDeploy: 'Withdrawn', withdrawn })
                    const asset = allAsset.find(e => e.data.serialNumber === data.serialNumber)
                    assetsServices.set(asset?.id, { status: 'Ready', deployed: deleteField() })
                    Swal.fire(
                        "Withdrawn!",
                        "Your file has been change status to Ready.",
                        "success"
                    ).then(() => window.location.reload());
                }
            });
        } catch (err) {
            alert(err);
        }
    }

    useEffect(() => {
        let resultFilter = [];
        resultFilter.push(allDeployment?.filter((e) => {
            let deploy = e.data.isDeployed === true

            let search = filter.search !== "" ? e.data.serialNumber
                .toLowerCase()
                .search(filter.search.toLowerCase()) !== -1
                : true;

            let category = filter.category !== "all" ? e.data.category
                .toLowerCase()
                .search(filter.category.toLowerCase()) !== -1
                : true;

            return deploy && search && category
        }));
        setResponse(resultFilter[0])
    }, [allDeployment, filter])

    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
        setDataTable(response.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
    }, [response, pageTable])

    return (
        <>
            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Confirm Date</TableCell>
                            <TableCell>Asset Site</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Serial Number</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell className="text-center">Status Deploy</TableCell>
                            <TableCell className="text-center">Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {dataTable.map(({ id, data }) => (
                            <TableRow className="dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={id}>
                                <TableCell>{new Date(data?.deployed?.confirmAt?.seconds * 1000).toLocaleDateString("in-ID")}</TableCell>
                                <TableCell>
                                    {allSite?.filter((e) => e.id === data?.site)[0]?.data.name}
                                </TableCell>
                                <TableCell>{data?.category}</TableCell>
                                <TableCell>{data?.brand} {data.model}</TableCell>
                                <TableCell>{data?.serialNumber}</TableCell>
                                <TableCell>{data?.deployed?.user}</TableCell>
                                <TableCell>{data?.deployed?.email}</TableCell>
                                <TableCell>{data?.deployed?.job}</TableCell>
                                <TableCell>{data?.deployed?.department ? data?.deployed?.department : '-'}</TableCell>
                                <TableCell className="text-center" >
                                    {(() => {
                                        switch (data?.statusDeploy) {
                                            case "Deployed":
                                                return <Badge className="float-right my-1" type="success">{data?.statusDeploy}</Badge>
                                            case "Withdrawn":
                                                return <Badge className="float-right my-1" type="neutral">{data?.statusDeploy}</Badge>
                                            default:
                                                return <Badge className="float-right my-1" type="neutral">{data?.statusDeploy}</Badge>
                                        }
                                    })()}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Button layout="link" size="icon" aria-label="Withdrawal" disabled={!priviledges?.edit || data?.isWithdrawn} onClick={() => handleWithdraw({ id, data })}>
                                            <WithdrawIcon className="w-5 h-5" aria-hidden="true" color='#7e3af2' />
                                        </Button>
                                        <Button layout="link" size="icon" aria-label="Detail">
                                            <InformationIcon className="w-5 h-5" aria-hidden="true" color="#7e3af2" onClick={() => openModal(data)} />
                                        </Button>
                                        <Button layout="link" size="icon" aria-label="Download">
                                            <DownloadIcon className="w-5 h-5" aria-hidden="true" color="#7e3af2" onClick={() => BASTDeployment({ id, data, site: allSite?.filter((e) => e.id === data?.site)[0]?.data.name })} />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TableFooter>
                    {response?.length !== 0 && (
                        <Pagination
                            totalResults={response.length}
                            resultsPerPage={resultsPerPage}
                            onChange={onPageChangeTable}
                            label="Table navigation"
                        />
                    )}
                </TableFooter>
            </TableContainer>
            <ModalDetail isModalOpen={isModalOpen} closeModal={closeModal} data={detail} isDeployed={detail.isDeployed} />
        </>
    )
}
