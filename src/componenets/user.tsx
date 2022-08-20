import Sidebar from "../common/Sidebar";
import Table from "react-bootstrap/Table";
import React, { FormEventHandler, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { userList } from "../services/ApiCalls";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Navbar } from "../common/Navbar";
import DashboardLayout from "./DashboardLayout";

import Offcanvas from "react-bootstrap/Offcanvas";

interface UserListType {
  id: number | null;
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
  let [idCounter, setIdCounter] = useState(30);

  const [addData, setAddData] = useState<UserListType>({
    id: null,
    image: "",
    firstName: "",
    lastName: "",
    maidenName: "",
    age: null,
    email: "",
  });

  const validate = Yup.object({
    id: Yup.number()
      .max(222, "must be 3 character or less ")
      .required("Required"),
    firstName: Yup.string().max(20, "").required("name is required"),
    lastName: Yup.string()
      .max(20, "must be 20 character or less")
      .required("name is required"),
    maidenName: Yup.string()
      .max(20, "must be 20 character or less ")
      .required("name is required"),
    age: Yup.number().max(100, "too short").required("age is required"),
    email: Yup.string().email("invalid email").required("Required email"),
  });

  // useEffect(() => {
  //   console.log("addData ==> ", addData);
  // }, [addData]);

  // useEffect(() => {
  //   console.log("list ==> ", list);
  // }, [list]);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   let name = event.target.name;
  //   let value: string;
  //   if (name == "image") {
  //     if (event.target.files && event.target.files[0]) {
  //       value = URL.createObjectURL(event.target.files[0]);
  //     }
  //   } else {
  //     value = event.target.value;
  //   }

  //   setAddData((prevalue) => {
  //     return {
  //       ...prevalue,
  //       [name]: value,
  //     };
  //   });
  // };

  // const handleSubmit = (event: any) => {
  //   console.log("hello");

  //   event.preventDefault();
  //   const newArr = [...list];
  //   newArr.push(addData);
  //   setList(newArr);
  //   console.log("hello");
  // };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showw, setShoww] = useState(false);

  const handleClosee = () => setShoww(false);
  const handleShoww = () => setShoww(true);

  const getUserList = async () => {
    const res = await userList();
    setList(res?.data.users);
  };
  useEffect(() => {
    getUserList();
  }, []);

  const deleteUser = (user: any) => {
    const newUserList = list.filter((item) => item.id != user.id);
    setList(newUserList);
  };

  return (
    <DashboardLayout>
      <>
        <>
          <strong>All Users</strong>{" "}
          <button className="btn btn-outline-warning" onClick={handleShoww}>
            ADDUSER
          </button>
        </>

        <table className="table table-bordered">
          {/* <Button onClick={handleShow}>ADDUSER</Button> */}
          {/* <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#myModal"

          onClick={handleShow}
        >
          ADD USER
        </button> */}

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
            {list.map((item) => {
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
                    <button className="btn btn-outline-info">Edit</button>
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
        {/* {/* <Modal show={show} onHide={handleClose}> */}

        <Offcanvas placement="end" show={showw} onHide={handleClosee}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Add User</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Formik
              initialValues={{
                id: null,
                image: "",
                firstName: "",
                lastName: "",
                maidenName: "",
                age: null,
                email: "",
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                console.log("values ==> ", values);
                console.log("hello");
                const params = {
                  ...values,
                  image:
                    typeof values.image !== "string"
                      ? URL.createObjectURL(values.image)
                      : "",
                };
                const newArr = [...list];
                newArr.push(values);
                setList(newArr);
                console.log(newArr);
                console.log("hello");
                handleClose();
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <div className="mb-3 mt-3">
                    <label className="form-label">id</label>
                    <Field name="id" type="text" className="form-control" />
                    {errors.firstName && touched.firstName ? (
                      <div className="errorm">{"id is necessary"}</div>
                    ) : null}
                  </div>
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
                      <div className="errorm">{"first name is necessary"}</div>
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
                      <div className="errorm">
                        {"last name is required feild"}
                      </div>
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
                      <div className="errorm">{"where is mname"}</div>
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
                      <div className="errorm">{"age is required"}</div>
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
                </Form>
              )}
            </Formik>
          </Offcanvas.Body>
        </Offcanvas>

        {/* </Modal> */}
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

        {/* <Navbar />
      <Sidebar /> */}
      </>
    </DashboardLayout>
  );
}
