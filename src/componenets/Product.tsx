import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Sidebar from "../common/Sidebar";
import { productList } from "../services/ApiCalls";

interface productListType{
    id:number;
    title:string;
    Description:string;
    price:number;
    rating:number;
    brand:string;

}

export default function Product(){

let [data,setData]=useState<productListType[]>([]);
const getProductList = async () =>{
    const res=await productList();
    setData(res?.data.products)
};
useEffect(()=>{
    getProductList();
},[]);


    return(
        <>
        <h1>Products</h1>
        <Table striped bordered hover>
      
      <thead>
        <tr>
          <th>#</th>
          <th>title</th>
        
          <th>price</th>
          <th>rating</th>
          <th>brand</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
            
              <td>{item.price}</td>
              <td>{item.rating}</td>
              <td>{item.brand}</td>
              
              <td>
                <Button>Edit</Button>
              </td>
              <td>
                {/* <Button onClick={() => deleteUser(item)}>DeleteProduct</Button> */}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table> 
        <Sidebar/>
        </>
    )
}