import {
  PRODUCT_FETCH_START,
  PRODUCT_FETCH_SUCCESS,
  PRODUCT_FETCH_FAILURE,
  PRODUCT_DELETE_START,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  SINGLE_PRODUCT_FETCH_START,
  SINGLE_PRODUCT_FETCH_SUCCESS,
  SINGLE_PRODUCT_FETCH_FAILURE,
  PRODUCT_CREATE_START,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  PRODUCT_UPDATE_START,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAILURE,
} from "../constants/ActionTypes";

const initialState = {
  products: [],
  productsLoading: false,
  error: "",
  product: [],
  productLoading: false,
  productCreate: [],
  productCreateLoading: false,
  deleteproduct: [],
  productDeleteLoading: false,
  updateProduct: [],
  productUpdateLoading: false,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_FETCH_START:
      return {
        ...state,
        productsLoading: true,
      };
    case PRODUCT_FETCH_SUCCESS:
      return {
        ...state,
        productsLoading: false,
        products: action.products,
      };
    case PRODUCT_FETCH_FAILURE:
      return {
        ...state,
        error: action.error,
        products: [],
        productsLoading: false,
      };
    case PRODUCT_CREATE_START:
      return {
        ...state,
        productCreateLoading: true,
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        productCreateLoading: false,
        productCreate: action.createProduct,
      };
    case PRODUCT_CREATE_FAILURE:
      return {
        ...state,
        error: action.error,
        productCreate: [],
        productCreateLoading: false,
      };
    case PRODUCT_DELETE_START:
      return {
        ...state,
        productDeleteLoading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        productDeleteLoading: false,
        deleteproduct: action.deleteProduct,
      };
    case PRODUCT_DELETE_FAILURE:
      return {
        ...state,
        error: action.error,
        deleteproduct: [],
        productDeleteLoading: false,
      };
    case PRODUCT_UPDATE_START:
      return {
        ...state,
        productUpdateLoading: true,
      };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        productUpdateLoading: false,
        updateProduct: action.updateProduct,
      };
    case PRODUCT_UPDATE_FAILURE:
      return {
        ...state,
        error: action.error,
        updateProduct: [],
        productUpdateLoading: false,
      };
    case SINGLE_PRODUCT_FETCH_START:
      return {
        ...state,
        productLoading: true,
      };
    case SINGLE_PRODUCT_FETCH_SUCCESS:
      return {
        ...state,
        productLoading: false,
        product: action.product,
      };
    case SINGLE_PRODUCT_FETCH_FAILURE:
      return {
        ...state,
        error: action.error,
        product: [],
        productLoading: false,
      };
    default:
  }

  return state;
}
