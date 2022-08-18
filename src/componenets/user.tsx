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
    firstName: Yup.string()
      .max(20, "must be 20 character or less ")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "must be 20 character or less ")
      .required("Required"),
    maidenName: Yup.string()
      .max(20, "must be 20 character or less ")
      .required("Required"),
    age: Yup.number()
      .max(90, "must be 2 character or less ")
      .required("Required"),
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

  const getUserList = async () => {
    const res = await userList();
    setList(res?.data.users);
  };
  useEffect(() => {
    getUserList();
  }, []);

  const deleteUser = (user: UserListType) => {
    const newUserList = list.filter((item) => item.id != user.id);
    setList(newUserList);
  };

  return (
    <DashboardLayout>
      <>
        <>
          <strong>All Users</strong>{" "}
        </>

        <table className="table">
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
                    <Button>Edit</Button>
                  </td>
                  <td>
                    <Button onClick={() => deleteUser(item)}>Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal show={show} onHide={handleClose}>
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
                <label>id</label>
                <Field name="id" />
                {errors.id && touched.id ? <div>{errors.id}</div> : null}

                <label>image</label>
                <Field
                  name="image"
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
                  <div>{errors.image}</div>
                ) : null}

                <label>FirstName</label>
                <Field name="firstName" type="text" />
                {errors.firstName && touched.firstName ? (
                  <div>{errors.firstName}</div>
                ) : null}

                <label>lastName</label>
                <Field name="lastName" />
                {errors.lastName && touched.lastName ? (
                  <div>{errors.lastName}</div>
                ) : null}

                <label>Mname</label>
                <Field name="maidenName" />
                {errors.maidenName && touched.maidenName ? (
                  <div>{errors.maidenName}</div>
                ) : null}

                <label>Age</label>
                <Field name="age" />
                {errors.age && touched.age ? <div>{errors.age}</div> : null}

                <div className="mb-3 mt-3">
                  <label className="form-label">Email:</label>
                  <Field name="email" className="form-control" />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                </div>

                <Button type="submit" className="btn_sub">
                  Submit{" "}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>
        {/* <Navbar />
      <Sidebar /> */}
      </>
    </DashboardLayout>
  );
}
