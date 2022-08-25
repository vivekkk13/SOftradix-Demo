import React, { useEffect, useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import Sidebar from "../common/Sidebar";
import { createProduct, productList } from "../services/ApiCalls";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";

import DashboardLayout from "./DashboardLayout";
import { number } from "yup/lib/locale";

interface productListType {
  id?: number | null;
  title: string;
  thumbnail?: string;
  Description?: string;
  price?: number | null;
  rating?: number | null;
  brand: string;
}

export default function Product() {
  let [data, setData] = useState<productListType[]>([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [deleteProduct, setDeleteProduct] = useState({});
  const [formValues, setFormValues] = useState<any>({
    check: false,
    list: {
      id: "",
      title: "",
      price: null,
      rating: null,
      brand: "",
    },
  });
  // const [editProduct, setEditProduct] = useState<{
  //   check: boolean;
  //   list: productListType;
  // }>({
  //   check: false,
  //   list: {
  //     id: null,
  //     title: "",
  //     price: null,
  //     rating: null,
  //     brand: "",
  //   },
  // });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getProductList = async (searchProduct: string) => {
    const res = await productList(searchProduct);
    setData(res?.data.products);
  };
  useEffect(() => {
    getProductList(searchProduct);
  }, [searchProduct]);

  const deleteprod = (user: any) => {
    const newProductList = data.filter((item) => item.id != user.id);
    setData(newProductList);
  };
  const [showw, setShoww] = useState(false);

  const handleClosee = () => setShoww(false);
  const handleShoww = () => setShoww(true);

  const addproduct = async (formValues: any) => {
    const response = await createProduct(formValues);
    console.log("response <===> ", response);
    const newArr = [...data];
    newArr.push(formValues);
    setData(newArr);
  };

  const updateProduct = (value: any) => {
    let newAns = [...data];
    let index = data.findIndex((val) => val.id === value.id);
    const newObj = { ...data[index], ...value };
    newAns[index] = newObj;
    setData(newAns);
  };

  return (
    <DashboardLayout>
      <>
        <strong>All Products</strong>{" "}
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            setFormValues({
              check: false,
              list: {
                id: null,
                title: "",
                price: null,
                rating: null,
                brand: "",
              },
            });

            handleShoww();
          }}
        >
          {" "}
          ADDProduct
        </button>
        <div className="form-outline">
          <input
            type="search"
            id="form1"
            className="form-control"
            placeholder="Search Product.."
            aria-label="Search"
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
        </div>
        <table className="table table-bordered">
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
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setFormValues({ check: true, list: item });
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
                        setDeleteProduct(item);
                        handleShow();
                      }}
                    >
                      DeleteProduct
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
              Are you sure you want to delete this Product
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
                  deleteprod(deleteProduct);
                  handleClose();
                }}
              >
                yes
              </button>
            </div>
          </div>
        </Modal>
        <Offcanvas placement="end" show={showw} onHide={handleClosee}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              {" "}
              {formValues.check ? "Edit product Here" : "Add product here"}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <form>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  value={formValues.list.title}
                  type="input"
                  className="form-control"
                  onChange={(e) =>
                    setFormValues({ ...formValues, title: e.target.value })
                  }
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  value={formValues.list.price}
                  name="number"
                  type="input"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) =>
                    setFormValues({ ...formValues, price: e.target.value })
                  }
                  aria-describedby="emailHelp"
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <input
                  value={formValues.list.rating}
                  name="number"
                  type="input"
                  className="form-control"
                  id="exampleInputPassword1"
                  aria-describedby="emailHelp"
                  onChange={(e) =>
                    setFormValues({ ...formValues, rating: e.target.value })
                  }
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Brand</label>
                <input
                  value={formValues.list.brand}
                  type="input"
                  className="form-control"
                  id="exampleInputPassword1"
                  aria-describedby="emailHelp"
                  onChange={(e) =>
                    setFormValues({ ...formValues, brand: e.target.value })
                  }
                ></input>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={(list) => {
                  if (formValues.check) {
                    updateProduct(list);
                  } else {
                    addproduct(list);
                  }
                  handleClosee();
                }}
              >
                Submit
              </button>
            </form>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    </DashboardLayout>
  );
}
