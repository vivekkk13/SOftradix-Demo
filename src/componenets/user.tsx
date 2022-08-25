import Sidebar from "../common/Sidebar";
import Table from "react-bootstrap/Table";
import React, { FormEventHandler, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { createUser, userList } from "../services/ApiCalls";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Navbar } from "../common/Navbar";
import DashboardLayout from "./DashboardLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Offcanvas from "react-bootstrap/Offcanvas";

interface UserListType {
  id?: number | null;
  image: string | React.ChangeEvent<HTMLInputElement> | null;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number | null;
  email: string;
}

export default function User() {
  let [list, setList] = useState<UserListType[]>([]);
  let [checkdelete, setCheckDelete] = useState({});
  const [search, setSearch] = useState<string>("");
  const [addResponse, setAddResponse] = useState<any>({});
  const [editUser, setEditUser] = useState({
    check: false,
    data: {
      id: "",
      image: "",
      firstName: "",
      lastName: "",
      maidenName: "",
      age: null,
      email: "",
    },
  });

  /******        YUP validation start          ********/

  const validate = Yup.object({
    firstName: Yup.string().max(20, "").required("name is required"),
    lastName: Yup.string()
      .max(20, "must be 20 character or less")
      .required("name is required!"),
    maidenName: Yup.string()
      .max(20, "must be 20 character or less ")
      .required("Middlename is required!"),
    age: Yup.number().max(100, "too short").required("age is required!"),
    email: Yup.string()
      .email("Email should be valid and contain @")
      .required("Email is required"),
  });

  /******        YUP validation end       ********/

  /********     for open or closing Modal start         ****** */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /********     for open or closing Modal end       ****** */

  /********     for open or closing offcanvas start         ****** */

  const [showw, setShoww] = useState(false);

  const handleClosee = () => setShoww(false);
  const handleShoww = () => setShoww(true);
  /********     for open or closing Modal end      ****** */

  /**********   Get userlist api start *** */
  const getUserList = async (search: string) => {
    const res = await userList(search);
    setList(res?.data.users);
  };
  useEffect(() => {
    getUserList(search);
  }, [search]);

  /**********   Get userlist api end *** */

  /*******   Function for delete a user (start)    ****** */
  const deleteUser = (user: any) => {
    const newUserList = list.filter((item) => item.id != user.id);
    setList(newUserList);
  };
  /*******   Function for delete a user (end)    ****** */

  /*******   Function for add a user (start)    ****** */
  const addNewUser = async (values: any) => {
    const response = await createUser(values);
    console.log("response <===> ", response);
    setAddResponse(response?.data);
  };

  useEffect(() => {
    const newAns = [...list];
    newAns.push(addResponse);
    setList(newAns);
  }, [addResponse]);

  /*******   Function for add a user (end)    ****** */

  const updateUser = (values: any) => {
    let newArr = [...list];
    let index = newArr.findIndex((item) => item.id === values.id);
    console.log("index =====>", index);

    const newObj = { ...list[index], ...values };
    newArr[index] = newObj;
    console.log("index===>", index);
    console.log("newArr===>", newArr);
    setList(newArr);
  };

  return (
    <DashboardLayout>
      <>
        <>
          <strong>All Users</strong>{" "}
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              setEditUser({
                check: false,
                data: {
                  id: "",
                  image: "",
                  firstName: "",
                  lastName: "",
                  maidenName: "",
                  age: null,
                  email: "",
                },
              });

              handleShoww();
            }}
          >
            Add User
            <span>
              <i className="fa fa-plus" aria-hidden="true"></i>
            </span>
          </button>
          <div className="form-outline">
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search user.."
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">image</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">maidenName</th>
              <th scope="col">age</th>
              <th scope="col">email</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item: any) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {typeof item.image === "string" ? (
                      <img src={item.image}></img>
                    ) : (
                      ""
                    )}
                  </td>
                  <td scope="row">{item.firstName}</td>
                  <td scope="row">{item.lastName}</td>
                  <td scope="row">{item.maidenName}</td>
                  <td scope="row">{item.age}</td>
                  <td scope="row">{item.email}</td>

                  <td>
                    <button
                      className="btn btn-outline-info"
                      onClick={() => {
                        setEditUser({ check: true, data: item });
                        handleShoww();
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setCheckDelete(item);
                        handleShow();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Offcanvas placement="end" show={showw} onHide={handleClosee}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              {editUser.check ? "Edit User" : "Add user"}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Formik
              initialValues={{
                id: editUser.check ? editUser.data.id : "",
                image: "",
                firstName: editUser.check ? editUser.data.firstName : "",
                lastName: editUser.check ? editUser.data.lastName : "",
                maidenName: editUser.check ? editUser.data.maidenName : "",
                age: editUser.check ? editUser.data.age : null,
                email: editUser.check ? editUser.data.email : "",
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                if (editUser.check) {
                  updateUser(values);

                  handleClosee();
                  toast("edit successfully");
                } else {
                  if (list.find((item) => item.email === values.email)) {
                    alert("email already exist");
                  } else {
                    addNewUser(values);

                    handleClosee();
                    toast("added sucessfully");
                  }
                }
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <div className="mb-3 mt-3">
                    <label className="form-label">image</label>
                    <Field
                      name="image"
                      className="form-control"
                      type="file"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement> | null
                      ) => {
                        if (event?.currentTarget?.files) {
                          setFieldValue("image", event.currentTarget.files[0]);
                        }
                      }}
                    />
                    {errors.image && touched.image ? (
                      <div className="errorm">{"please select image"}</div>
                    ) : null}
                  </div>

                  <div className="mb-3 mt-3">
                    <label className="form-label">FirstName</label>
                    <Field
                      name="firstName"
                      type="text"
                      className="form-control"
                      placeholder="Firstname..."
                    />
                    {errors.firstName && touched.firstName ? (
                      <div className="errorm">{"firstname is required!"}</div>
                    ) : null}
                  </div>
                  <div className="mb-3 mt-3">
                    <label className="form-label">lastName</label>
                    <Field
                      name="lastName"
                      className="form-control"
                      placeholder="Lastname..."
                    />
                    {errors.lastName && touched.lastName ? (
                      <div className="errorm">{"lastname is required!"}</div>
                    ) : null}
                  </div>

                  <div className="mb-3 mt-3">
                    <label className="form-label">Mname</label>
                    <Field
                      name="maidenName"
                      className="form-control"
                      placeholder="Middlename..."
                    />
                    {errors.maidenName && touched.maidenName ? (
                      <div className="errorm">{"middlename is required!"}</div>
                    ) : null}
                  </div>

                  <div className="mb-3 mt-3">
                    <label>Age</label>
                    <Field
                      name="age"
                      className="form-control"
                      placeholder="Age..."
                    />
                    {errors.age && touched.age ? (
                      <div className="errorm">{"age is required!"}</div>
                    ) : null}
                  </div>

                  <div className="mb-3 mt-3">
                    <label className="form-label">Email:</label>
                    <Field
                      name="email"
                      className="form-control"
                      placeholder="Email..."
                    />

                    {errors.email && touched.email ? (
                      <div className="errorm">{errors.email}</div>
                    ) : null}
                  </div>
                  <Button type="submit" className="btn_sub">
                    Submit{" "}
                  </Button>
                  <ToastContainer />
                </Form>
              )}
            </Formik>
          </Offcanvas.Body>
        </Offcanvas>

        <Modal show={show} onHide={handleClose}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete user
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  handleClose();
                }}
              >
                no
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  deleteUser(checkdelete);
                  handleClose();
                }}
              >
                yes
              </button>
            </div>
          </div>
        </Modal>
        <ToastContainer />
      </>
    </DashboardLayout>
  );
}
