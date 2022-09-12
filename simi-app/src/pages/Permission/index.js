import React, { useEffect, useState } from "react";
import {
  Button, Card, CardBody, TableContainer, Table, TableCell, TableBody, TableRow, TableHeader, Input
} from "@windmill/react-ui";
import { ArrowLeftIcon } from "../../assets/icons";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { rolesServices } from "../../services/roles";

function Permission() {
  const [dataRole, setDataRole] = useState([])
  const [priviledges, setPriviledges] = useState([])
  const [checkedAll, setCheckedAll] = useState(false);
  const { register, handleSubmit } = useForm()
  const history = useHistory();
  const { id } = useParams();

  const onSubmit = (value) => {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        rolesServices.update(id, { priviledges: Object.values(value) })
        Swal.fire('Saved!', '', 'success')
          .then(() => window.location.reload())
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
          .then(() => history.goBack())
      }
    })
  }

  const handleCheck = (e) => {
    const checkAll = {[e.target.name]: true}

    if (checkAll) {
      // document.getElementById('view').checked = true;
    }
  };

  useEffect(() => {
    try {
      rolesServices.getById(id).then(data => {
        setDataRole(data);
        setPriviledges(data.priviledges)
      })
    } catch (error) {
      console.log(error)
    }
  }, [id])

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

      <Card className="my-8 shadow-md">
        <CardBody>
          <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
            Role {dataRole.roleName}
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TableContainer className="mb-8">
              <Table>
                <TableHeader>
                  <tr className="text-center">
                    <TableCell className="text-left">Permissions</TableCell>
                    <TableCell>All Access</TableCell>
                    <TableCell>View</TableCell>
                    <TableCell>Add</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </tr>
                </TableHeader>
                <TableBody>
                  {priviledges?.map((data, index) => (
                    <TableRow key={index} className="text-center dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                      <TableCell className="text-left">
                        <input defaultValue={data.permission} {...register(`${index}.permission`)} hidden />
                        <span>{data.permission}</span>
                      </TableCell>
                      <TableCell>
                        <Input type="checkbox" name="checkAll" id="checkAll" onChange={handleCheck} className="border-gray-300 dark:border-gray-600" />
                      </TableCell>
                      <TableCell>
                        <Input type="checkbox" id="view" defaultChecked={data.view} {...register(`${index}.view`)} onChange={handleCheck} className="border-gray-300 dark:border-gray-600" />
                      </TableCell>
                      <TableCell>
                        <Input type="checkbox" id="add" defaultChecked={data.add} {...register(`${index}.add`)} onChange={handleCheck} className="border-gray-300 dark:border-gray-600" />
                      </TableCell>
                      <TableCell>
                        <Input type="checkbox" id="edit" defaultChecked={data.edit} {...register(`${index}.edit`)} onChange={handleCheck} className="border-gray-300 dark:border-gray-600" />
                      </TableCell>
                      <TableCell>
                        <Input type="checkbox" id="delete" defaultChecked={data.delete} {...register(`${index}.delete`)} onChange={handleCheck} className="border-gray-300 dark:border-gray-600" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button block size="large" type="submit">
              Save
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
}

export default Permission;