import Sidebar from "../common/Sidebar";
import Table from "react-bootstrap/Table";
import React, { FormEventHandler, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { userList } from "../services/ApiCalls";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface UserListType {
  id: number | null;
  image: string;
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
    <>
      <h1>USERS</h1>

      <Table striped bordered hover>
        <Button onClick={handleShow}>ADDUSER</Button>

        <thead>
          <tr>
            <th>#</th>
            <th>image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>maidenName</th>
            <th>age</th>
            <th>email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <img src={item.image}></img>
                </td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.maidenName}</td>
                <td>{item.age}</td>
                <td>{item.email}</td>

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
      </Table>
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

            const newArr = [...list];
            newArr.push(values);
            setList(newArr);
            console.log("hello");
            handleClose();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <label>id</label>
              <Field name="id" />
              {errors.id && touched.id ? <div>{errors.id}</div> : null}

              <label>image</label>
              <Field name="image" type="file" />
              {errors.image && touched.image ? <div>{errors.image}</div> : null}

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

              <label>Email</label>
              <Field name="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}

              <Button type="submit" className="btn_sub">
                Submit{" "}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
      <Sidebar />
    </>
  );
}
