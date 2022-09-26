import React, { useEffect, useState } from 'react'

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Button,
  Pagination
} from '@windmill/react-ui'
import { ArchiveIcon, EditIcon, TrashIcon } from '../../assets/icons'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import { assetsServices } from '../../services/assets'
// make a copy of the data, for the second table

function TableITAsset({ selected }) {
  const [response, setResponse] = useState([])

  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1)

  // setup data for every table
  const [dataTable, setDataTable] = useState([])

  // pagination setup
  const resultsPerPage = 10

  // pagination change control
  function onPageChangeTable(p) {
    setPageTable(p)
  }

  const handleArchive = (id) => {
    try {
      Swal.fire({
        text: "Do you want to move in Archive?",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, archive it!'
      }).then((result) => {
        if (result.isConfirmed) {
          assetsServices.update(id, { "visibility": "Archived", })
          Swal.fire(
            'Archived!',
            'Your file has been archived.',
            'success',
          ).then(() => window.location.reload())
        }
      })
    } catch (err) {
      alert(err)
    }
  }

  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          assetsServices.delete(id)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
          ).then(() => window.location.reload())
        }
      })
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    try {
      assetsServices.getAllITAsset().then(data => {
        setResponse(data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

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
              <TableCell>Site</TableCell>
              <TableCell>SO Number</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell className="text-center">Status</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((asset) => (
              <TableRow className="dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={asset.id}>
                <TableCell>
                  {asset.data.site}
                </TableCell>
                <TableCell>
                  {asset.data.salesOrder}
                </TableCell>
                <TableCell>
                  {asset.data.category}
                </TableCell>
                <TableCell>
                  <Link className="text-blue-500" to={`/app/assets/detail/${asset.id}`}>{asset.data.brand} {asset.data.model}</Link>
                </TableCell>
                <TableCell>
                  {asset.data.serialNumber}
                </TableCell>
                <TableCell className="text-center" >
                  {(() => {
                    switch (asset.data.status) {
                      case 'In Use':
                        return <Badge type="warning" >{asset.data.status}</Badge>;
                      case 'Broken':
                        return <Badge type="danger"  >{asset.data.status}</Badge>;
                      case 'Ready':
                        return <Badge type="success" >{asset.data.status}</Badge>;
                      case 'On Service':
                        return <Badge type="neutral" >{asset.data.status}</Badge>;
                      default:
                        return <Badge type="primary" >{asset.data.status}</Badge>;
                    }
                  })()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Link to={`/app/assets/form/itasset/${asset.id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" color="#7e3af2" />
                      </Button>
                    </Link>
                    {selected === "Archived" ?
                      (<Button layout="link" size="icon" aria-label="Delete" onClick={() => handleDelete(asset.id)}>
                        <TrashIcon className="w-5 h-5" aria-hidden="true" color='#c81e1e' />
                      </Button>)
                      :
                      (<Button layout="link" size="icon" aria-label="Archive" onClick={() => handleArchive(asset.id)}>
                        <ArchiveIcon className="w-5 h-5" aria-hidden="true" color="#7e3af2" />
                      </Button>)
                    }
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
    </>
  )
}

export default TableITAsset