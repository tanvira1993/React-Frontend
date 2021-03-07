import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { 
  // IntlReducer as Intl, 
  IntlProvider 
} from "react-redux-multilingual";
import "./index.scss";
import App from "./components/app";
import { ScrollContext } from "react-router-scroll-4";
import store from "./store";
// Products
import Product_list from "./components/products/physical/product-list";
import Add_pro from "./components/products/digital/digital-add-pro";
import Edit_pro from "./components/products/digital/digital-edit-pro";
//Pages
import Login from "./components/auth/login";

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <IntlProvider locale="en">
          <BrowserRouter basename={"/"}>
            <ScrollContext>
              <Switch>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/`}
                  component={Login}
                />
                <App>                 
                  <Route
                    path={`${process.env.PUBLIC_URL}/products/product-list`}
                    component={Product_list}
                  />
                  
                  <Route
                    path={`${process.env.PUBLIC_URL}/products/add-product`}
                    component={Add_pro}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/products/edit-product/:id`}
                    component={Edit_pro}
                  />                  
                </App>
              </Switch>
            </ScrollContext>
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));
