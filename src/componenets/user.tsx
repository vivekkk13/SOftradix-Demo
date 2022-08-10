import Sidebar from "../common/Sidebar";
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import Adduser from "./Adduser";
import { Button, Form } from "react-bootstrap";
import { userList } from "../services/ApiCalls";
import { Navigate, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

interface UserListType {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  email: string;
}

export default function User() {
  let [idCounter, setIdCounter] = useState(1);
  let [list, setList] = useState<UserListType[]>([]);
  let navigate = useNavigate();

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

  const deleteUser = (user: { id: number }) => {
    const newUserList = list.filter((item) => item.id != user.id);
    setList(newUserList);
  };


const initialValues={


  firstName:"",
  lastName: "",
  maidenName:"",
  age: "",
  email:"",
  
}

const HandleChange = (e) => {
  const keyword = e?.target.value
  updateKeyword(keyword)
 }





  
  return (
    <>
      <h1>USERS</h1>

      <Table striped bordered hover>
        <Button onClick={handleShow}>ADDUSER</Button>

        <thead>
          <tr>
            <th>#</th>
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
        <h1>AddUser</h1>
        <Form onSubmit={}>
          
       <input 
       type="name" 
       placeholder="FirstName"
       onChange={HandleChange}>

       </input>
        <input type="name" placeholder="lasttName"></input>
        <input type="name" placeholder="MaidenName"></input>
        <input type="age" placeholder="age"></input>
        <input type="email" placeholder="email"></input>
       </Form>
       
          
          <Button variant="primary" onClick={handleClose}>
            AddUser
          </Button>
       
      </Modal>
      <Sidebar />
    </>
  );
}
