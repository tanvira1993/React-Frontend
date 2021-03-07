import * as types from "../constants/ActionTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import * as api from "../constants/ReUsageStaff";

toast.configure();

//user creation
export const createUserStart = () => ({
  type: types.USER_CREATE_START,
});

export const createUserSuccess = (createUser) => ({
  type: types.USER_CREATE_SUCCESS,
  createUser,
});

export const createUserFailure = (error) => ({
  type: types.USER_CREATE_FAILURE,
  error,
});

export const createUser = (data, authInfo, history) => (dispatch) => {
  try {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Bearer " + authInfo);
    headers.append("Origin", "*");
    dispatch(createUserStart());
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        username: data.userName,
        password: data.password,
        password_confirmation: data.confirmPassword,
        phone: data.phone,
        avatar: data.desc,
      }),
    };
    fetch(api.register, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error || result.errors) {
            dispatch(createUserFailure(result.error));
            if (
              result.error ===
              "Unauthenticated user may not perform this operation."
            ) {
              dispatch(logout(authInfo, history));
            }
            else if (
              result.errors.email !== undefined && result.errors.username !== undefined
            ) {
              toast.error(result.errors.email[0]);
              toast.error(result.errors.username[0])
            }
            else if (
              result.errors.email !== undefined 
            ) {
              toast.error(result.errors.email[0]);
            }
            else if (
               result.errors.username !== undefined
            ) {
              toast.error(result.errors.username[0])
            }
            else{
              //do nothing
            }
          } else {
            dispatch(createUserSuccess(result));            
            if (result.message === "Member has been created successfully.") {
              toast.success("Member has been created successfully.");
              history.push("/users/list-user");
            }
          }
        },
        (error) => {
          dispatch(createUserFailure("Conncection Error!"));
        }
      );
  } catch (error) {
    toast.error("Something is wrong..!! Please, try agian.");
  }
};

//admin login

export const adminloginStart = () => ({
  type: types.ADMIN_LOGIN_START,
});

export const adminloginSuccess = (email,token) => ({
  type: types.ADMIN_LOGIN_SUCCESS,
  email,token
});

export const adminloginFailure = (error) => ({
  type: types.ADMIN_LOGIN_FAILURE,
  error,
});

export const adminLoginAll = (loginObject, history) => (dispatch) => {
  dispatch(adminloginStart());
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: loginObject.email,
      password: loginObject.password,
    }),
  };

  //Response check
  fetch(api.login, requestOptions)
    .then((response) => response.json())
    .then((response) => {
      if (response.error) {
        dispatch(adminloginFailure(response.error));
        history.push("/");
      }
      if(response.token){
        dispatch(adminloginSuccess(loginObject.email, response.token));
        history.push("/products/product-list");
        toast.success("Login Successful");
      }
    })
    .catch((error) => {
      dispatch(adminloginFailure(error));
      history.push("/");
      toast.error(error);
    });
};

//logout

export const logout = (authInfo, history) => (dispatch) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authInfo}`,
    },
  };

  //Response check
  fetch(api.logout, requestOptions)
    .then((response) => response.json())
    .then((response) => {
      dispatch(adminloginFailure());
      toast.success(response.message);
      history.push("/");
    })
    .catch((error) => {
      dispatch(adminloginFailure(error));
      history.push("/");
      toast.error("Please, Try Later!");
    });
};


//Product creation
export const createProductStart = () => ({
  type: types.PRODUCT_CREATE_START,
});

export const createProductSuccess = (createProduct) => ({
  type: types.PRODUCT_CREATE_SUCCESS,
  createProduct,
});

export const createProductFailure = (error) => ({
  type: types.PRODUCT_CREATE_FAILURE,
  error,
});

export const createProduct = (data, authInfo, history) => (dispatch) => {
  try {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Bearer " + authInfo);
    headers.append("Origin", "*");

    dispatch(createProductStart());

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: data,
    };
    fetch(api.product_add, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            dispatch(createProductFailure(result.error));
            toast.error(result.message);
            if (
              result.error ===
              "Unauthenticated user may not perform this operation."
            ) {
              dispatch(logout(authInfo, history));
            }
          } else {
            dispatch(createProductSuccess(result));
            if(result.message === "Product is created successfully."){
            toast.success("Product is created successfully.");
            history.push("/products/product-list");
            }
            else{
              toast.error("Please, provide valid information about sub-category.");
            }
            
          }
        },
        (error) => {
          dispatch(createProductFailure("Conncection Error!"));
        }
      );
  } catch (error) {
    toast.error("Something is wrong..!! Please, try agian.");
  }
};

// get all products
export const fetchProductsStart = () => ({
  type: types.PRODUCT_FETCH_START,
});

export const fetchProductsSuccess = (products) => ({
  type: types.PRODUCT_FETCH_SUCCESS,
  products,
});

export const fetchProductsFailure = (error) => ({
  type: types.PRODUCT_FETCH_FAILURE,
  error,
});

export const fetchallProducts = (authInfo, page, history, key, paginateUrl) => (
  dispatch
) => {
  try {
    let requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/ json",
        Authorization: `Bearer ${authInfo}`,
      },
    };
    dispatch(fetchProductsStart());
    let url;
    if(key === ""){
      url = api.product_list + "?page=" + page
    }
    if (key === "pagination") {
      url = paginateUrl
    }
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then(
          (result) => {
            if(result.success){
              dispatch(fetchProductsSuccess(result)); 
            }
            else {
              dispatch(fetchProductsFailure(result.error));
              if (result.status == "Token is Invalid"||result.status == "Token is Expired"||result.status == "Authorization Token not found") {
                dispatch(logout(authInfo, history));
              }
            }
          },
          (error) => {
            dispatch(fetchProductsFailure("Conncection Error!"));
          }
        );
   
  } catch (error) {
    toast.error("Something is wrong..!! Please, try agian.");
  }
};

//get single product
export const fetchSingleProductStart = () => ({
  type: types.SINGLE_PRODUCT_FETCH_START,
});

export const fetchSingleProductSuccess = (product) => ({
  type: types.SINGLE_PRODUCT_FETCH_SUCCESS,
  product,
});

export const fetchSingleProductFailure = (error) => ({
  type: types.SINGLE_PRODUCT_FETCH_FAILURE,
  error,
});

export const fetchSingleProduct = (id, authInfo, history) => (dispatch) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/ json",
        Authorization: `Bearer ${authInfo}`,
      },
    };
    dispatch(fetchSingleProductStart());
    fetch(api.product_details+ id, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            dispatch(fetchSingleProductFailure(result.error));
            if (result.error === "Route not found.") {
              dispatch(logout(authInfo, history));
            }
          } else {
            dispatch(fetchSingleProductSuccess(result));
          }
        },
        (error) => {
          dispatch(fetchSingleProductFailure("Conncection Error!"));
        }
      );
  } catch (error) {
    toast.error("Something is wrong..!! Please, try agian.");
  }
};

//delete product
export const deleteProductStart = () => ({
  type: types.PRODUCT_DELETE_START,
});

export const deleteProductSuccess = (deleteProduct) => ({
  type: types.PRODUCT_DELETE_SUCCESS,
  deleteProduct,
});

export const deleteProductFailure = (error) => ({
  type: types.PRODUCT_DELETE_FAILURE,
  error,
});

export const deleteProduct = (uuid, authInfo, history) => (dispatch) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/ json",
        Authorization: `Bearer ${authInfo}`,
      },
    };

    dispatch(deleteProductStart());
    fetch(api.product_delete  + uuid, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            dispatch(deleteProductFailure(result.error));
            if (result.error === "Route not found.") {
              dispatch(logout(authInfo, history));
            }
          } else {
            dispatch(deleteProductSuccess(result));
            toast.error(result.message);
          }
        },
        (error) => {
          dispatch(deleteProductFailure("Conncection Error!"));
        }
      );
  } catch (error) {
    toast.error("Something is wrong..!! Please, try agian.");
  }
};

//update Product
export const updateProductStart = () => ({
  type: types.PRODUCT_UPDATE_START,
});

export const updateProductSuccess = (updateProduct) => ({
  type: types.PRODUCT_UPDATE_SUCCESS,
  updateProduct,
});

export const updateProductFailure = (error) => ({
  type: types.PRODUCT_UPDATE_FAILURE,
  error,
});

export const updateProduct = (uuid, dataObj, authInfo, history) => (
  dispatch
) => {
  try {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Bearer " + authInfo);
    headers.append("Origin", "*");
    const requestOptions = {
      method: "PATCH",
      headers: headers,
      body: dataObj,
    };
    dispatch(updateProductStart());
    fetch(api.product_edit + "/" + uuid, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            dispatch(updateProductFailure(result.error));
            if (
              result.error ===
              "Unauthenticated user may not perform this operation."
            ) {
              dispatch(logout(authInfo, history));
            }
          } else {
            dispatch(updateProductSuccess(result));
            if(result.message === "Product is created successfully."){
              toast.success("Product is Updated successfully.");
              history.push("/products/product-list");
              }
            else{
              toast.error("Please, provide valid Information.");
            }
          }
        },
        (error) => {
          dispatch(updateProductFailure("Conncection Error!"));
        }
      );
  } catch (error) {
    toast.error("Something is wrong..!! Please, try agian.");
  }
};


