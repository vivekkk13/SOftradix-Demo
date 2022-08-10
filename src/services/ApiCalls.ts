import axios from "axios";


export const userList = ()=>{
    try {
        return axios.get('https://dummyjson.com/users').then((response)=>{
            
         return response;

        });
     
      } catch (error) {
        console.error(error);
      }
    };


export const productList = () => {
  try {
    return axios.get('https://dummyjson.com/products').then((response)=>{
        
     return response;

    });
 
  } catch (error) {
    console.error(error);
  }
};    