import React, { useEffect, useState } from "react";

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
  Pagination,
} from "@windmill/react-ui";
import {
  ArchiveIcon,
  EditIcon,
  FormsIcon,
  RestoreIcon,
  TrashIcon,
} from "../../assets/icons";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import { assetsServices } from "../../services/assets";
import ModalFormDeploy from "../Deployments/ModalFormDeploy";
import useDataSite from "../../hooks/useDataSite";
// make a copy of the data, for the second table

function TableITAsset({ filter, priviledges }) {
  const [response, setResponse] = useState([]);

  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1);

  // setup data for every table
  const [dataTable, setDataTable] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetId, setAssetId] = useState(null);
  const [assetData, setAssetData] = useState([]);
  const history = useHistory();
  const { allSite } = useDataSite()

  // pagination setup
  const resultsPerPage = 10;

  // pagination change control
  function onPageChangeTable(p) {
    setPageTable(p);
  }

  function openModal({ id, data }) {
    setIsModalOpen(true);
    setAssetId(id);
    setAssetData(data);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const handleArchive = (id) => {
    try {
      Swal.fire({
        title: "Archive",
        text: "Do you want to move in Archive?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, archive it!",
      }).then((result) => {
        if (result.isConfirmed) {
          assetsServices.update(id, { isArchived: true });
          Swal.fire(
            "Archived!",
            "Your file has been archived.",
            "success"
          ).then(() => window.location.reload());
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  const handleRestore = (id) => {
    try {
      Swal.fire({
        title: "Restore",
        text: "Do you want to restore and move in Unarchive?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, restore it!",
      }).then((result) => {
        if (result.isConfirmed) {
          assetsServices.update(id, { isArchived: false });
          Swal.fire(
            "Restored!",
            "Your file has been restored.",
            "success"
          ).then(() => window.location.reload());
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          assetsServices.delete(id);
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => window.location.reload()
          );
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    let archived = false
    if (filter.archive === "Archived") {
      archived = true
    }

    try {
      assetsServices.getAllITAsset().then((data) => {
        let resultFilter = [];
        resultFilter.push(data?.filter((e) => {
          let search =
            filter.search !== ""
              ? e.data.serialNumber
                .toLowerCase()
                .search(filter.search.toLowerCase()) !== -1
              : true;

          let archive = e.data.isArchived === archived

          let category =
            filter.category !== "all"
              ? e.data.category
                .toLowerCase()
                .search(filter.category.toLowerCase()) !== -1
              : true;

          let status =
            filter.status !== "all"
              ? e.data.status
                .toLowerCase()
                .search(filter.status.toLowerCase()) !== -1
              : true;

          return search && archive && category && status
        }));

        setResponse(resultFilter[0]);
      });
    } catch (error) {
      console.log(error);
    }
  }, [filter]);


  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable(
      response.slice(
        (pageTable - 1) * resultsPerPage, pageTable * resultsPerPage
      )
    );
  }, [response, pageTable]);

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
              <TableCell className="text-center">Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map(({ id, data }) => (
              <TableRow
                className="dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={id}
              >
                <TableCell>{allSite?.filter((e) => e.id === data.site)[0]?.data.name}</TableCell>
                <TableCell>{data.salesOrder}</TableCell>
                <TableCell>{data.category}</TableCell>
                <TableCell>
                  <Link
                    className="text-blue-500"
                    to={`/app/assets/detail/${id}`}
                  >
                    {data.brand} {data.model}
                  </Link>
                </TableCell>
                <TableCell>{data.serialNumber}</TableCell>
                <TableCell className="text-center">
                  {(() => {
                    switch (data.status) {
                      case "In Use":
                        return <Badge type="primary">{data.status}</Badge>
                      case "Broken":
                        return <Badge type="danger">{data.status}</Badge>
                      case "Ready":
                        return <Badge type="success">{data.status}</Badge>
                      case "On Service":
                        return <Badge type="neutral">{data.status}</Badge>
                      default:
                        return <Badge type="warning">{data.status}</Badge>
                    }
                  })()}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center space-x-2">
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Edit"
                      disabled={!priviledges[0]?.edit}
                      onClick={() => history.push(`/app/assets/form/itasset/${id}`)}
                    >
                      <EditIcon
                        className="w-5 h-5"
                        aria-hidden="true"
                        color="#7e3af2"
                      />
                    </Button>

                    {filter.archive === "Archived" ? (
                      <div className="flex items-center space-x-2">
                        <Button
                          layout="link"
                          size="icon"
                          aria-label="Restore"
                          disabled={!priviledges[0]?.edit}
                          onClick={() => handleRestore(id)}
                        >
                          <RestoreIcon
                            className="w-5 h-5"
                            aria-hidden="true"
                            color="#7e3af2"
                          />
                        </Button>
                        <Button
                          layout="link"
                          size="icon"
                          aria-label="Delete"
                          disabled={!priviledges[0]?.delete}
                          onClick={() => handleDelete(id)}
                        >
                          <TrashIcon
                            className="w-5 h-5"
                            aria-hidden="true"
                            color="#c81e1e"
                          />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Archive"
                        disabled={!priviledges[0]?.edit}
                        onClick={() => handleArchive(id)}
                      >
                        <ArchiveIcon
                          className="w-5 h-5"
                          aria-hidden="true"
                          color="#7e3af2"
                        />
                      </Button>
                    )}

                    <div hidden={filter.archive === "Archived" ? true : false}>
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Assign"
                        disabled={data.status === "Ready" ? (!priviledges[1]?.add) : true}
                        onClick={() => openModal({ id, data })}
                      >
                        <FormsIcon
                          className="w-5 h-5"
                          aria-hidden="true"
                          color="#7e3af2"
                        />
                      </Button>
                    </div>
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
      <ModalFormDeploy
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        assetId={assetId}
        data={assetData}
      />
    </>
  );
}

export default TableITAsset;
