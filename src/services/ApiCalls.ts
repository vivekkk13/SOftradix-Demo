import axios from "axios";

export const userList = (search: string) => {
  try {
    return axios
      .get(`https://dummyjson.com/users/search?q=${search}`)
      .then((response) => {
        return response;
      });
  } catch (error) {
    console.error(error);
  }
};

export const productList = () => {
  try {
    return axios.get("https://dummyjson.com/products").then((response) => {
      return response;
    });
  } catch (error) {
    console.error(error);
  }
};

export const createUser = (data: any) => {
  try {
    return axios({
      method: "post",
      url: "https://dummyjson.com/users/add",
      data: data,
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log("response ==> ", response);
      return response;
    });
  } catch (error) {
    console.log("error ==> ", error);
  }
};
