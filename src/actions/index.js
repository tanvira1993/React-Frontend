import * as types from "../constants/ActionTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import * as api from "../constants/ReUsageStaff";

toast.configure();

//admin login
export const adminloginStart = () => ({
  type: types.ADMIN_LOGIN_START,
});

export const adminloginSuccess = (email, token) => ({
  type: types.ADMIN_LOGIN_SUCCESS,
  email,
  token,
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
      if (response.token) {
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

export const createProduct = (data, authInfo, history, image) => (dispatch) => {
  try {
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + authInfo);
    let formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("price", data.price);
    formdata.append("description", data.description);
    formdata.append("image", image);
    dispatch(createProductStart());

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: formdata,
    };
    fetch(api.product_add, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            dispatch(createProductSuccess(result));
            toast.success("Product is created successfully.");
            history.push("/products/product-list");
          } else {
            dispatch(createProductFailure(result.message));
            if (
              result.status == "Token is Invalid" ||
              result.status == "Token is Expired" ||
              result.status == "Authorization Token not found"
            ) {
              dispatch(logout(authInfo, history));
            } else {
              toast.error(result.message);
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
    if (key === "") {
      url = api.product_list + "?page=" + page;
    }
    if (key === "pagination") {
      url = paginateUrl;
    }
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            dispatch(fetchProductsSuccess(result));
          } else {
            dispatch(fetchProductsFailure(result.message));
            if (
              result.status == "Token is Invalid" ||
              result.status == "Token is Expired" ||
              result.status == "Authorization Token not found"
            ) {
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
    fetch(api.product_details + id, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            dispatch(fetchSingleProductSuccess(result));
          } else {
            dispatch(fetchSingleProductFailure(result.message));
            if (
              result.status == "Token is Invalid" ||
              result.status == "Token is Expired" ||
              result.status == "Authorization Token not found"
            ) {
              dispatch(logout(authInfo, history));
            } else {
              toast.error(result.message);
            }
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
    fetch(api.product_delete + uuid, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            dispatch(deleteProductSuccess(result));
            toast.error(result.message);
          } else {
            dispatch(deleteProductFailure(result.message));
            if (
              result.status == "Token is Invalid" ||
              result.status == "Token is Expired" ||
              result.status == "Authorization Token not found"
            ) {
              dispatch(logout(authInfo, history));
            } else {
              toast.error(result.message);
            }
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

export const updateProduct = (uuid, dataObj, authInfo, history, image) => (
  dispatch
) => {
  try {
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + authInfo);
    let formdata = new FormData();
    formdata.append("title", dataObj.title);
    formdata.append("price", dataObj.price);
    formdata.append("description", dataObj.description);
    if (image != "") {
      formdata.append("image", image);
    }
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: formdata,
    };
    dispatch(updateProductStart());
    fetch(api.product_edit + uuid, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            dispatch(updateProductSuccess(result));
            toast.success("Product is updated successfully.");
            history.push("/products/product-list");
          } else {
            dispatch(updateProductFailure(result.message));
            if (
              result.status == "Token is Invalid" ||
              result.status == "Token is Expired" ||
              result.status == "Authorization Token not found"
            ) {
              dispatch(logout(authInfo, history));
            } else {
              toast.error(result.message);
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
