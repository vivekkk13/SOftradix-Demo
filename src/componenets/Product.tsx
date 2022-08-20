import React, { useEffect, useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import Sidebar from "../common/Sidebar";
import { productList } from "../services/ApiCalls";
import Modal from "react-bootstrap/Modal";
import DashboardLayout from "./DashboardLayout";

interface productListType {
  id: number | null;
  title: string;
  thumbnail: string;
  Description: string;
  price: number | null;
  rating: number | null;
  brand: string;
}

export default function Product() {
  let [data, setData] = useState<productListType[]>([]);

  const [addItem, setAddItem] = useState<productListType>({
    id: null,
    title: "",
    thumbnail: "",
    Description: "",
    price: null,
    rating: null,
    brand: "",
  });
  useEffect(() => {
    console.log("addItem ==> ", addItem);
  }, [addItem]);

  useEffect(() => {
    console.log("data ==> ", data);
  }, [data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    let name = event.target.value;

    setAddItem((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event: any) => {
    console.log("hello");

    event.preventDefault();
    const newAns = [...data];
    newAns.push(addItem);
    setData(newAns);
    console.log("hello");
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getProductList = async () => {
    const res = await productList();
    setData(res?.data.products);
  };
  useEffect(() => {
    getProductList();
  }, []);
  const deleteUser = (user: any) => {
    const newProductList = data.filter((item) => item.id != user.id);
    setData(newProductList);
  };

  return (
    <DashboardLayout>
      <>
        <h1>Products</h1>
        <table className="table table-bordered">
          {/* <Button onClick={handleShow}> ADDProduct</Button> */}

          <thead>
            <tr>
              <th>#</th>
              <th scope="col">title</th>
              <th scope="col">image</th>
              <th scope="col">price</th>
              <th scope="col">rating</th>
              <th scope="col">brand</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>

                  <td>{item.title}</td>
                  <td>
                    <img src={item.thumbnail}></img>
                  </td>

                  <td>{item.price}</td>
                  <td>{item.rating}</td>
                  <td>{item.brand}</td>

                  <td>
                    <Button>Edit</Button>
                  </td>
                  <td>
                    <Button onClick={() => deleteUser(item)}>
                      DeleteProduct
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal show={show} onHide={handleClose}>
          <Form onSubmit={handleSubmit}>
            <>
              <strong>AddProduct</strong>
            </>
            <br></br>
            <label>id</label>
            <input
              type="id"
              placeholder="id.."
              name="id"
              onChange={handleChange}
            ></input>
            <label>title</label>
            <input
              type="name"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            ></input>
            <label>price</label>
            <input
              type="text"
              placeholder="price"
              name="price"
              onChange={handleChange}
            ></input>
            <label>rating</label>
            <input
              type="text"
              name="rating"
              onChange={handleChange}
              placeholder="rating.."
            ></input>
            <label>brand </label>
            <input
              type="text"
              name="brand	"
              onChange={handleChange}
              placeholder="brand"
            ></input>

            <Button variant="primary" type="submit" onClick={handleClose}>
              Addproduct
            </Button>
          </Form>
        </Modal>
        {/* <Sidebar /> */}
      </>
    </DashboardLayout>
  );
}
