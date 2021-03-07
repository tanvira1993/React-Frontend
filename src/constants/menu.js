import {
  Box
} from "react-feather";

export const MENUITEMS = [

  {
    title: "Products",
    icon: Box,
    type: "sub",
    active: false,
    children: [
      {
        path: "/products/add-product",
        title: "Add Product",
        type: "link",
      },
      {
        path: "/products/product-list",
        title: "Product List",
        type: "link",
      },
    ],
  }
];
